import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AppReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      newState = {
        ...state,
        loading: false,
        transactions: action.payload
      };
      break;
    case 'ADD_TRANSACTION':
      newState = {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
      break;
    case 'DELETE_TRANSACTION':
      newState = {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        )
      };
      break;
    case 'RESET_TRANSACTIONS':
        newState = {
            ...state,
            transactions: []
        };
        break;
    case 'TRANSACTION_ERROR':
      newState = {
        ...state,
        loading: false,
        error: action.payload
      };
      break;
    case 'TOGGLE_THEME':
      newState = {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
      break;
    default:
      return state;
  }
  
  localStorage.setItem('transactions', JSON.stringify(newState.transactions));
  localStorage.setItem('theme', newState.theme);
  return newState;
};

const getInitialState = () => {
  const localTransactions = localStorage.getItem('transactions');
  const localTheme = localStorage.getItem('theme');
  return {
    transactions: localTransactions ? JSON.parse(localTransactions) : [],
    error: null,
    loading: true,
    theme: localTheme || 'light'
  };
};

const initialState = getInitialState();

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransactions() {
    if (initialState.transactions.length === 0) {
      try {
        const res = await axios.get('https://your-backend-url.onrender.com/api/v1/transactions');
        dispatch({
          type: 'GET_TRANSACTIONS',
          payload: res.data.data
        });
      } catch (err) {
        dispatch({
          type: 'TRANSACTION_ERROR',
          payload: err.response?.data?.error || 'Could not fetch data'
        });
      }
    } else {
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: initialState.transactions
      });
    }
  }

  async function addTransaction(transaction) {
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Could not add transaction'
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Could not delete transaction'
      });
    }
  }

  async function resetTransactions() {
    if (window.confirm('Are you sure you want to delete all transactions? This cannot be undone.')) {
      try {
        await axios.delete('/api/v1/transactions');
        dispatch({
          type: 'RESET_TRANSACTIONS'
        });
      } catch (err) {
        dispatch({
          type: 'TRANSACTION_ERROR',
          payload: err.response?.data?.error || 'Could not reset transactions'
        });
      }
    }
  }

  function toggleTheme() {
    dispatch({ type: 'TOGGLE_THEME' });
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      error: state.error,
      loading: state.loading,
      theme: state.theme,
      getTransactions,
      addTransaction,
      deleteTransaction,
      toggleTheme,
      resetTransactions
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
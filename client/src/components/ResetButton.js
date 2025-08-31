import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const ResetButton = () => {
  const { resetTransactions } = useContext(GlobalContext);

  return (
    <div className="reset-container">
      <button onClick={resetTransactions} className="btn-reset">
        <i className="fas fa-trash-alt"></i> Reset All Transactions
      </button>
    </div>
  );
};
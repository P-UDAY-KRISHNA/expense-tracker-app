import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(''); // Changed from 0 to an empty string

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();
    const newTransaction = {
      text,
      amount: +amount // Convert amount to a number on submit
    };
    addTransaction(newTransaction);
    setText('');
    setAmount(''); // Reset to an empty string
  };

  return (
    <>
      <h3>Add New Transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <i className="fas fa-edit icon"></i>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Transaction details..." 
          />
        </div>
        <div className="form-control">
          <i className="fas fa-rupee-sign icon"></i>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Enter amount..." // This placeholder will now show
          />
        </div>
        <button className="btn">Add Transaction</button>
      </form>
    </>
  );
};
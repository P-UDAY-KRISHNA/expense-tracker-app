import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const [isVisible, setIsVisible] = useState(false);

  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const toggleVisibility = (e) => {
    e.stopPropagation(); // Prevents the parent div's onClick from firing
    setIsVisible(!isVisible);
  };

  return (
    <div className="balance-container" onClick={() => setIsVisible(!isVisible)}>
      <div className="balance-header">
        <h4>Your Balance</h4>
        <span onClick={toggleVisibility} className="toggle-btn">
          {isVisible ? 'Hide' : 'Show'}
        </span>
      </div>

      <div className="balance-content">
        {isVisible ? (
          <h1 className="balance-amount">₹{total}</h1>
        ) : (
          <div className="balance-hidden">
            Click to Show Balance
          </div>
        )}
      </div>
    </div>
  );
};
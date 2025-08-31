import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? '-' : '+';
  const iconClass = transaction.amount < 0 ? 'fas fa-arrow-down' : 'fas fa-arrow-up';
  const amountClass = transaction.amount < 0 ? 'minus' : 'plus';

  return (
    <li>
      <div className="text">
        <i className={`icon`} style={{ color: amountClass === 'plus' ? 'var(--success-color)' : 'var(--error-color)' }}>
          <i className={iconClass}></i>
        </i>
        {transaction.text}
      </div>
      <div className="amount-container">
        <span className={`amount ${amountClass}`}>{sign}₹{Math.abs(transaction.amount)}</span>
        <button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </li>
  );
};


export const TransactionList = () => {
  const { transactions, loading } = useContext(GlobalContext);

  const incomeTransactions = transactions.filter(t => t.amount > 0);
  const expenseTransactions = transactions.filter(t => t.amount < 0);

  const incomeTotal = incomeTransactions
    .reduce((acc, t) => (acc += t.amount), 0)
    .toFixed(2);
  const expenseTotal = (expenseTransactions
    .reduce((acc, t) => (acc += t.amount), 0) * -1)
    .toFixed(2);


  if (loading) return <p>Loading transactions...</p>;

  return (
    <>
      <h3>Mini Statement</h3>
      <div className="statement-container">
        {/* Income Column */}
        <div className="column">
          <h4>
            <span>Income:</span>
            <span className="money plus">+₹{incomeTotal}</span>
          </h4>
          <ul className="list">
            {incomeTransactions.map(transaction => (
              <Transaction key={transaction._id} transaction={transaction} />
            ))}
          </ul>
        </div>

        {/* Expense Column */}
        <div className="column">
          <h4>
            <span>Expense:</span>
            <span className="money minus">-₹{expenseTotal}</span>
          </h4>
          <ul className="list">
            {expenseTransactions.map(transaction => (
              <Transaction key={transaction._id} transaction={transaction} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
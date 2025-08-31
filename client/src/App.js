import React, { useContext, useEffect } from 'react';
import './App.css';

import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { ThemeToggle } from './components/ThemeToggle';
import { ResetButton } from './components/ResetButton';
import { GlobalProvider, GlobalContext } from './context/GlobalState';

const AppContent = () => {
  const { theme } = useContext(GlobalContext);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <ThemeToggle />
      <Header />
      <div className="main-container">
        <div className="top-row">
          <div className="card">
            <Balance />
          </div>
          <div className="card">
            <AddTransaction />
          </div>
        </div>
        <div className="card">
          <TransactionList />
        </div>
        <ResetButton />
      </div>
    </>
  );
};

function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  );
}

export default App;
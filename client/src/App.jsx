import React, { useState, useEffect } from 'react';
import { Global, css } from '@emotion/core';
import Welcome from './components/Welcome';
import AccountCreation from './components/AccountCreation';
import accountService from './services/accounts';

const App = () => {
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedFlowiUser');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      accountService.setToken(user.token);
      setAccounts(accountService.getAll());
    }
  }, [user]);

  const handleLogout = () => {
    window.localStorage.clear();
    accountService.setToken(null);
    setUser(null);
  };

  if (!user) {
    return (
      <div>
        <Global
          styles={css`
            * {
              background-color: #f0f4f8;
              font-family: Roboto;
              color: #102a43;
            }
          `}
        />
        <Welcome setUser={setUser} newUser={newUser} setNewUser={setNewUser} />
      </div>
    );
  }

  return (
    <div>
      {accounts.length === 0 ? (
        <AccountCreation accounts={accounts} setAccounts={setAccounts} />
      ) : (
        <p>Welcome to flowi</p>
      )}

      <button type="button" onClick={handleLogout}>
        LOG OUT
      </button>
    </div>
  );
};

export default App;

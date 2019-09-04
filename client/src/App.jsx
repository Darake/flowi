import React, { useState, useEffect } from 'react';
import { Global, css } from '@emotion/core';
import Welcome from './components/Welcome';

const App = () => {
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedFlowiUser');
    if (loggedUser) setUser(JSON.parse(loggedUser));
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  if (!user)
    return (
      <div>
        <Global
          styles={css`
            * {
              background-color: #f0f4f8;
              text-align: center;
            }
          `}
        />
        <Welcome setUser={setUser} newUser={newUser} setNewUser={setNewUser} />
      </div>
    );

  return (
    <button type="button" onClick={handleLogout}>
      LOG OUT
    </button>
  );
};

export default App;

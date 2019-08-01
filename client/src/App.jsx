import React, { useState, useEffect } from 'react';
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
      <Welcome setUser={setUser} newUser={newUser} setNewUser={setNewUser} />
    );

  return (
    <button type="button" onClick={handleLogout}>
      LOG OUT
    </button>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import Welcome from './components/Welcome';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedFlowiUser');
    if (loggedUser) setUser(JSON.parse(loggedUser));
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  if (!user) return <Welcome setUser={setUser} />;

  return (
    <button type="button" onClick={handleLogout}>
      LOG OUT
    </button>
  );
};

export default App;

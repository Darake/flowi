import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '../../hooks';
import loginService from '../../services/login';

const Welcome = ({ setUser, newUser, setNewUser }) => {
  const [email, resetEmail] = useField('email');
  const [password, resetPassword] = useField('password');
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        email: email.value,
        password: password.value
      });
      resetEmail();
      resetPassword();

      window.localStorage.setItem('loggedFlowiUser', JSON.stringify(user));
      setUser(user);
    } catch (exception) {
      setLoginError('Incorrect email or password');
    }
  };

  return (
    <main>
      <h1>flowi</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input id="email" {...email} required />
        </label>

        <span>{loginError}</span>

        <label htmlFor="password">
          Password
          <input id="password" {...password} />
        </label>

        {newUser ? (
          <div>
            <label htmlFor="currency">
              Currency
              <select id="currency">
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GPB">GBP</option>
              </select>
            </label>

            <button type="button" onClick={() => setNewUser(false)} key="1">
              Already an user?
            </button>

            <button type="submit">CONFIRM</button>
          </div>
        ) : (
          <div>
            <button type="button" onClick={() => setNewUser(true)}>
              SIGN UP
            </button>

            <button type="submit">LOG IN</button>
          </div>
        )}
      </form>
    </main>
  );
};

Welcome.propTypes = {
  setUser: PropTypes.func.isRequired,
  newUser: PropTypes.bool.isRequired,
  setNewUser: PropTypes.func.isRequired
};

export default Welcome;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '../../hooks';
import loginService from '../../services/login';

const Welcome = ({ setUser }) => {
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
        <label htmlFor="loginEmail">
          Email
          <input id="loginEmail" {...email} />
        </label>

        <span>{loginError}</span>

        <label htmlFor="loginPassword">
          Password
          <input id="loginPassword" {...password} />
        </label>

        <button type="submit">LOG IN</button>
      </form>
    </main>
  );
};

Welcome.propTypes = {
  setUser: PropTypes.func.isRequired
};

export default Welcome;

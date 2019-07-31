import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../../hooks';
import loginService from '../../services/login';

const Welcome = ({ setUser }) => {
  const [email, resetEmail] = useField('email');
  const [password, resetPassword] = useField('password');

  const handleSubmit = async e => {
    e.preventDefault();

    const user = await loginService.login({
      email: email.value,
      password: password.value
    });
    resetEmail();
    resetPassword();

    window.localStorage.setItem('loggedFlowiUser', JSON.stringify(user));
    setUser(user);
  };

  return (
    <main>
      <h1>flowi</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="loginEmail">
          Email
          <input id="loginEmail" {...email} />
        </label>
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

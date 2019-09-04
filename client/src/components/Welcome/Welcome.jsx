/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import authService from '../../services/auth';

const Welcome = ({ setUser, newUser, setNewUser }) => {
  const [loginError, setLoginError] = useState(null);

  const authSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email address required'),
    password: Yup.string()
      .required('Password required')
      .min(6, 'Password has to be atleast 6 long')
  });

  const login = async (email, password) => {
    try {
      const user = await authService.login({ email, password });
      window.localStorage.setItem('loggedFlowiUser', JSON.stringify(user));
      setUser(user);
    } catch (exception) {
      setLoginError('Incorrect email or password');
    }
  };

  const register = async values => {
    try {
      const user = {
        email: values.email,
        password: values.password,
        currency: values.currency
      };
      await authService.register(user);
    } catch (exception) {
      setLoginError('There was an error signing up');
    }
  };

  const handleSubmit = async (values, actions) => {
    if (newUser) {
      register(values);
    }

    login(values.email, values.password);
    actions.setSubmitting(false);
  };

  return (
    <div
      css={css`
        width: 100vw;
        height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: grid;
          width: 300px;
        `}
      >
        <h1
          css={css`
            font-family: 'Courgette', cursive;
          `}
        >
          flowi
        </h1>

        <Formik
          initialValues={{
            email: '',
            password: '',
            currency: 'EUR'
          }}
          validationSchema={authSchema}
          onSubmit={handleSubmit}
          render={formProps => {
            return (
              <Form
                css={css`
                  display: grid;
                `}
              >
                <div
                  css={css`
                    display: grid;
                  `}
                >
                  <Field type="text" name="email" placeholder="Email" />
                  <ErrorMessage name="email" />
                </div>

                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" />

                {newUser ? (
                  <div
                    css={css`
                      display: grid;
                    `}
                  >
                    <label>
                      Choose a currency
                      <Field
                        name="currency"
                        component="select"
                        placeholder="Your Currency"
                      >
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="GPB">GBP</option>
                      </Field>
                    </label>
                    <ErrorMessage name="currency" />

                    <button type="submit" disabled={formProps.isSubmitting}>
                      CONFIRM
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewUser(false)}
                      key="1"
                      disabled={formProps.isSubmitting}
                    >
                      Already an user?
                    </button>
                  </div>
                ) : (
                  <div
                    css={css`
                      display: grid;
                    `}
                  >
                    <button type="submit" disabled={formProps.isSubmitting}>
                      LOG IN
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewUser(true)}
                      disabled={formProps.isSubmitting}
                    >
                      SIGN UP
                    </button>
                  </div>
                )}
              </Form>
            );
          }}
        />

        {loginError}
      </div>
    </div>
  );
};

Welcome.propTypes = {
  setUser: PropTypes.func.isRequired,
  newUser: PropTypes.bool.isRequired,
  setNewUser: PropTypes.func.isRequired
};

export default Welcome;

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
      await register(values);
    }

    login(values.email, values.password);
    actions.setSubmitting(false);
  };

  const inputTextCss = css`
    padding: 12px;
    box-sizing: border-box;
    margin: 8px 0;
    background-color: #d9e2ec;
    border-radius: 8px;
    border: 2px solid #bcccdc;
  `;

  const primaryButtonCss = css`
    border-radius: 8px;
    padding: 8px;
    background-color: #38bec9;
    border: 2px solid #2cb1bc;
    color: white;
    margin: 4px 0;
  `;

  const tertiaryButtonCss = css`
    background: none !important;
    border: none;
    padding: 0 !important;
    color: #069;
    text-decoration: underline;
    cursor: pointer;
    text-align: left;
    margin-top: 24px;
  `;

  const errorMessageCss = css`
    color: red;
    margin: 4px 0;
  `;

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
            color: #38bec9;
            text-align: center;
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
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email"
                    css={inputTextCss}
                  />
                  <ErrorMessage name="email" css={errorMessageCss} />
                </div>

                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  css={inputTextCss}
                />
                <ErrorMessage name="password" css={errorMessageCss} />

                {newUser ? (
                  <div
                    css={css`
                      display: grid;
                    `}
                  >
                    <label
                      css={css`
                        display: grid;
                        margin: 8px 0;
                      `}
                    >
                      <span
                        css={css`
                          grid-column: 1 / 3;
                          text-align: left;
                        `}
                      >
                        Choose a currency
                      </span>
                      <Field
                        name="currency"
                        component="select"
                        placeholder="Your Currency"
                        css={css`
                          padding: 12px;
                          border-radius: 8px;
                          background-color: #d9e2ec;
                          grid-column: 3;
                          border: 2px solid #bcccdc;
                        `}
                      >
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="GPB">GBP</option>
                      </Field>
                    </label>
                    <ErrorMessage name="currency" />

                    <button
                      type="submit"
                      disabled={formProps.isSubmitting}
                      css={primaryButtonCss}
                    >
                      CONFIRM
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewUser(false)}
                      key="1"
                      disabled={formProps.isSubmitting}
                      css={tertiaryButtonCss}
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
                    <button
                      type="submit"
                      disabled={formProps.isSubmitting}
                      css={primaryButtonCss}
                    >
                      LOG IN
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewUser(true)}
                      disabled={formProps.isSubmitting}
                      css={tertiaryButtonCss}
                    >
                      SIGN UP
                    </button>
                  </div>
                )}
              </Form>
            );
          }}
        />

        <span css={errorMessageCss}>{loginError}</span>
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

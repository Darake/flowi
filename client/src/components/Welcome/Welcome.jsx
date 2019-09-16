/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useSpring, animated } from 'react-spring';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import authService from '../../services/auth';
import accountService from '../../services/accounts';

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
      accountService.setToken(user.token);
      window.localStorage.setItem('loggedFlowiUser', JSON.stringify(user));
      setUser(user);
      setNewUser(false);
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
      login(values.email, values.password);
    } catch (exception) {
      setLoginError(
        'There was an error signing up. The email address might already be taken.'
      );
    }
  };

  const handleSignUp = () => {
    setNewUser(true);
    setLoginError(null);
  };

  const handleSubmit = (values, actions) => {
    if (newUser) {
      register(values);
    } else {
      login(values.email, values.password);
    }

    actions.setSubmitting(false);
  };

  const inputCss = css`
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

  const fadeAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { friction: 200 }
  });

  return (
    <animated.div
      css={css`
        width: 100vw;
        height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
      style={fadeAnimation}
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
                    css={inputCss}
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    css={errorMessageCss}
                  />
                </div>

                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  css={inputCss}
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  css={errorMessageCss}
                />

                <span css={errorMessageCss}>{loginError}</span>

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
                      onClick={handleSignUp}
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
      </div>
    </animated.div>
  );
};

Welcome.propTypes = {
  setUser: PropTypes.func.isRequired,
  newUser: PropTypes.bool.isRequired,
  setNewUser: PropTypes.func.isRequired
};

export default Welcome;

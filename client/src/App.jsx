import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import Authentication from './components/Authentication';
import AccountCreation from './components/AccountCreation';
import AccountView from './components/AccountView';
import Account from './components/Account';
import * as userActions from './reducers/userReducer';
import * as accountActions from './reducers/accountReducer';

const App = ({ user, checkUser, logout, accounts, initializeAccounts }) => {
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (user) {
      initializeAccounts();
    }
  }, [user, initializeAccounts]);

  const accountById = id => accounts.find(account => account.id === id);

  const globalStyle = css`
    * {
      font-family: Roboto;
      color: #102a43
      font-weight: 400;
    }
    body {
      margin: 0;
      padding: 0;
      height: 100vh;
      max-width: 100vw;
      background-color: #f0f4f8;
    }
  `;

  const Root = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  return (
    <Root>
      <Global styles={globalStyle} />
      {user ? (
        <Router>
          {accounts.length !== 0 ? (
            <div>
              <Route exact path="/" render={() => <AccountView />} />
              <Route
                exact
                path="/accounts/:id"
                render={({ match }) => (
                  <Account account={accountById(match.params.id)} />
                )}
              />
              <nav>
                <Link to="/">Accounts</Link>
                <button type="button" onClick={() => logout()}>
                  LOG OUT
                </button>
              </nav>
            </div>
          ) : (
            <AccountCreation />
          )}
        </Router>
      ) : (
        <Authentication />
      )}
    </Root>
  );
};

App.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  checkUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  initializeAccounts: PropTypes.func.isRequired
};

App.defaultProps = {
  user: null
};

const mapStateToProps = state => ({
  user: state.user,
  accounts: state.accounts
});

const mapDispatchToProps = {
  ...userActions,
  ...accountActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

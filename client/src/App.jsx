import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Global, css } from '@emotion/core';
import Authentication from './components/Authentication';
import AccountCreation from './components/AccountCreation';
import AccountView from './components/AccountView';
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

  const globalStyle = css`
    * {
      background-color: #f0f4f8;
      font-family: Roboto;
      color: #102a43;
    }
  `;

  return (
    <div>
      <Global styles={globalStyle} />
      {user ? (
        <div>
          {accounts.length !== 0 ? <AccountView /> : <AccountCreation />}
          <button type="button" onClick={() => logout()}>
            LOG OUT
          </button>
        </div>
      ) : (
        <Authentication />
      )}
    </div>
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

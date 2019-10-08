import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import Authentication from './components/Authentication';
import AccountCreation from './components/AccountCreation';
import AccountView from './components/AccountView';
import Account from './components/Account';
import MobileNav from './components/Navigation/MobileNav';
import DesktopNav from './components/Navigation/DesktopNav';
import { checkUser } from './reducers/userReducer';
import { initializeAccounts } from './reducers/accountReducer';

const App = () => {
  const user = useSelector(state => state.user);
  const accounts = useSelector(state => state.accounts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(initializeAccounts());
    }
  }, [user, dispatch]);

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

  const View = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    @media (min-width: 1224px) {
      flex-direction: row;
    }
  `;

  const Main = styled.main`
    height: 90vh;
  `;

  return (
    <Root>
      <Global styles={globalStyle} />
      {user ? (
        <Router>
          {accounts.length !== 0 ? (
            <View>
              <DesktopNav />
              <Main>
                <Route exact path="/" render={() => <p>Welcome</p>} />
                <Route exact path="/accounts" render={() => <AccountView />} />
                <Route
                  exact
                  path="/accounts/:id"
                  render={({ match }) => <Account id={match.params.id} />}
                />
              </Main>
              <MobileNav />
            </View>
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

export default App;

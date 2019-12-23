import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
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

  const accountById = id => accounts.find(a => a.id === id);

  if (!user) {
    return <Authentication />;
  }

  if (accounts.length === 0) {
    return (
      <Container maxWidth="xs">
        <AccountCreation />
      </Container>
    );
  }

  return (
    <div>
      <Router>
        <DesktopNav />
        <div>
          <Route exact path="/" render={() => <p>Welcome</p>} />
          <Route exact path="/accounts" render={() => <AccountView />} />
          <Route
            exact
            path="/accounts/:id"
            render={({ match }) => (
              <Account account={accountById(match.params.id)} />
            )}
          />
        </div>
        <MobileNav />
      </Router>
    </div>
  );
};

export default App;

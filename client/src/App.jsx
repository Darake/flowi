import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Authentication from './components/Authentication';
import AccountCreation from './components/AccountCreation';
import AccountView from './components/AccountView';
import Account from './components/Account';
import MobileNav from './components/Navigation/MobileNav';
import DesktopNav from './components/Navigation/DesktopNav';
import { checkUser } from './reducers/userReducer';
import { initializeAccounts } from './reducers/accountReducer';

const useStyles = makeStyles(theme => ({
  container: {
    paddingLeft: 0,
    paddingRight: 0,
    height: '100vh',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  main: {
    flexGrow: 1,
    paddingBottom: '56px'
  }
}));

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

  const classes = useStyles();

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
    <Container className={classes.container}>
      <Router>
        <Hidden smDown>
          <DesktopNav />
        </Hidden>
        <main className={classes.main}>
          <Route exact path="/" render={() => <p>Welcome</p>} />
          <Route exact path="/accounts" render={() => <AccountView />} />
          <Route
            exact
            path="/accounts/:id"
            render={({ match }) => (
              <Account account={accountById(match.params.id)} />
            )}
          />
        </main>
        <Hidden smUp>
          <MobileNav />
        </Hidden>
      </Router>
    </Container>
  );
};

export default App;

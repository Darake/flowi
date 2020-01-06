import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Authentication from './components/Authentication';
import AccountCreation from './components/AccountCreation';
import Accounts from './components/Accounts';
import Account from './components/Account';
import MobileNav from './components/Navigation/MobileNav';
import DesktopNav from './components/Navigation/DesktopNav';
import Budget from './components/Budget';
import Transactions from './components/Transactions';
import { checkUser } from './reducers/userReducer';
import { initializeAccounts } from './reducers/accountReducer';
import { initializeBudgets } from './reducers/budgetReducer';

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
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1)
    },
    paddingBottom: '56px',
    width: '100%'
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
      dispatch(initializeBudgets());
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
    <div className={classes.container}>
      <Hidden smDown>
        <DesktopNav />
      </Hidden>
      <main className={classes.main}>
        <Route exact path="/" render={() => <Budget />} />
        <Route exact path="/accounts" render={() => <Accounts />} />
        <Route
          exact
          path="/accounts/:id"
          render={({ match }) => (
            <Account account={accountById(match.params.id)} />
          )}
        />
        <Route
          exact
          path="/new-account"
          render={() => (
            <Container maxWidth="xs">
              <AccountCreation />
            </Container>
          )}
        />
        <Route exact path="/transactions" render={() => <Transactions />} />
      </main>
      <Hidden smUp>
        <MobileNav />
      </Hidden>
    </div>
  );
};

export default App;

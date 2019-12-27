import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import AccountList from './AccountList';
import AccountCreationModal from '../AccountCreation/AccountCreationModal';

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(2)
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(10),
    right: theme.spacing(2),
    opacity: 0.7
  },
  button: {
    margin: theme.spacing(1)
  },
  accounts: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(8)
    }
  }
}));

const AccountView = () => {
  const classes = useStyles();

  return (
    <div className={classes.accounts}>
      <Typography component="h1" variant="h6" className={classes.header}>
        Accounts
      </Typography>
      <AccountList />
      <Hidden smDown>
        <AccountCreationModal />
      </Hidden>
      <Hidden smUp>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          component={Link}
          to="/new-account"
        >
          <AddIcon />
        </Fab>
      </Hidden>
    </div>
  );
};

export default AccountView;

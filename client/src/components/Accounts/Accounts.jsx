import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import AccountTable from './AccountTable';
import AccountsHeader from './Header/AccountsHeader';
import AccountCreationModal from '../AccountCreation/AccountCreationModal';

const useStyles = makeStyles(theme => ({
  accounts: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(8)
    }
  }
}));

const Accounts = () => {
  const classes = useStyles();

  return (
    <div className={classes.accounts}>
      <AccountsHeader />
      <AccountTable />
      <Hidden smDown>
        <AccountCreationModal />
      </Hidden>
    </div>
  );
};

export default Accounts;

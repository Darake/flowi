import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import AccountList from './AccountList';
import AccountViewHeader from './Header/AccountViewHeader';
import AccountCreationModal from '../AccountCreation/AccountCreationModal';

const useStyles = makeStyles(theme => ({
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
      <AccountViewHeader />
      <AccountList />
      <Hidden smDown>
        <AccountCreationModal />
      </Hidden>
    </div>
  );
};

export default AccountView;

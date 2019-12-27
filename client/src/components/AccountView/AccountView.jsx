import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import AccountList from './AccountList';
import AccountCreation from '../AccountCreation';

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(2)
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(10),
    right: theme.spacing(2)
  }
}));

const AccountView = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography component="h1" variant="h6" className={classes.header}>
        Accounts
      </Typography>
      <AccountList />
      <Popup
        trigger={
          <Hidden smDown>
            <button type="button">Add Account</button>
          </Hidden>
        }
        modal
        closeOnDocumentClick
      >
        {close => (
          <div>
            <AccountCreation closeModal={close} />
            <button type="button" onClick={() => close()}>
              CANCEL
            </button>
          </div>
        )}
      </Popup>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        component={Link}
        to="/new-account"
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default AccountView;

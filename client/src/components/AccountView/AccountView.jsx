import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AccountList from './AccountList';
import AccountCreation from '../AccountCreation';
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
      <AccountCreationModal />
      <Hidden smUp>
        <Popup
          trigger={
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              size="small"
            >
              Add Account
            </Button>
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

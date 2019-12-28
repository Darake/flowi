import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AccountList from './AccountList';
import AccountCreationModal from '../AccountCreation/AccountCreationModal';

const useStyles = makeStyles(theme => ({
  header: {
    marginRight: 'auto'
  },
  desktopHeader: {
    padding: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  accounts: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(8)
    }
  },
  headerPaper: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: 'flex'
  }
}));

const AccountView = () => {
  const classes = useStyles();

  return (
    <div className={classes.accounts}>
      <Hidden smUp>
        <Paper
          className={classes.headerPaper}
          elevation={1}
          variant="outlined"
          square
        >
          <Typography component="h1" variant="h6" className={classes.header}>
            Accounts
          </Typography>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            component={Link}
            to="/new-account"
          >
            ADD ACCOUNT
          </Button>
        </Paper>
      </Hidden>
      <Hidden smDown>
        <Typography
          component="h1"
          variant="h6"
          className={classes.desktopHeader}
        >
          Accounts
        </Typography>
      </Hidden>
      <AccountList />
      <Hidden smDown>
        <AccountCreationModal />
      </Hidden>
    </div>
  );
};

export default AccountView;

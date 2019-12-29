import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  header: {
    marginRight: 'auto'
  },
  headerPaper: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: 'flex'
  }
}));

const MobileHeader = () => {
  const classes = useStyles();

  return (
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
  );
};

export default MobileHeader;

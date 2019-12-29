import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  desktopHeader: {
    padding: theme.spacing(2)
  }
}));

const DesktopHeader = () => {
  const classes = useStyles();

  return (
    <Typography component="h1" variant="h6" className={classes.desktopHeader}>
      Accounts
    </Typography>
  );
};

export default DesktopHeader;

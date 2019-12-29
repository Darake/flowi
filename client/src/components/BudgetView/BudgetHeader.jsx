import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import BudgetCreation from '../BudgetCreation';

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

const BudgetHeader = () => {
  const classes = useStyles();

  return (
    <Paper
      className={classes.headerPaper}
      elevation={1}
      variant="outlined"
      square
    >
      <Typography component="h1" variant="h6" className={classes.header}>
        Budget
      </Typography>
      <BudgetCreation />
    </Paper>
  );
};

export default BudgetHeader;

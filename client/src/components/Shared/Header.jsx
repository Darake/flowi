import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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

const BudgetHeader = ({ title, children }) => {
  const classes = useStyles();

  return (
    <Paper
      className={classes.headerPaper}
      elevation={1}
      variant="outlined"
      square
    >
      <Typography component="h1" variant="h6" className={classes.header}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

BudgetHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.objectOf(PropTypes.any).isRequired
};

export default BudgetHeader;

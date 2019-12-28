import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BudgetCreation from '../BudgetCreation';
import Balance from '../Shared/Balance';

const useStyles = makeStyles(theme => ({
  header: {
    marginRight: 'auto'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(10),
    right: theme.spacing(2),
    opacity: 0.7
  },
  headerPaper: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: 'flex'
  }
}));

const BudgetView = () => {
  const classes = useStyles();
  const budgets = useSelector(state => state.budgets);

  return (
    <div>
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Available</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budgets.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <Balance balance={row.balance} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BudgetView;

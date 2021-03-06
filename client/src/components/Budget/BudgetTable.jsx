import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Balance from '../Shared/Balance';
import { setCategory } from '../../reducers/selectedCategoryReducer';

const useStyles = makeStyles(theme => ({
  category: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    cursor: 'pointer'
  }
}));

const BudgetTable = ({ setCategoryDialogOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);

  const handleCategoryClick = category => {
    dispatch(setCategory(category));
    setCategoryDialogOpen(true);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map(row => (
            <TableRow
              key={row.name}
              onClick={() => handleCategoryClick(row)}
              className={classes.category}
            >
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
  );
};

BudgetTable.propTypes = {
  setCategoryDialogOpen: PropTypes.func.isRequired
};

export default BudgetTable;

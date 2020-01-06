import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Balance from '../Shared/Balance';

const useStyles = makeStyles(theme => ({
  balance: {
    color: '#38bec9'
  },
  row: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    backgroundColor: active =>
      active ? theme.palette.action.selected : 'white'
  }
}));

const AccountTable = () => {
  const accounts = useSelector(state => state.accounts);

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          {accounts.map(row => (
            <AccountRow row={row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const AccountRow = ({ row }) => {
  const location = useLocation();
  const history = useHistory();

  const accountPathname = `/accounts/${row.id}`;
  const active = location.pathname === accountPathname;
  const classes = useStyles(active);

  const onClick = id => {
    history.push(`/accounts/${id}`);
  };

  return (
    <TableRow onClick={() => onClick(row.id)} className={classes.row}>
      <TableCell scope="row">{row.name}</TableCell>
      <TableCell align="right">
        <Balance balance={row.balance} />
      </TableCell>
    </TableRow>
  );
};

AccountRow.propTypes = {
  row: PropTypes.objectOf(PropTypes.any).isRequired
};

export default AccountTable;

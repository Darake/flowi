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

const AccountList = () => {
  const accounts = useSelector(state => state.accounts);

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          {accounts.map(row => (
            <ListItem row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ListItem = ({ row }) => {
  const location = useLocation();
  const user = useSelector(state => state.user);
  const history = useHistory();

  const accountPathname = `/accounts/${row.id}`;
  const active = location.pathname === accountPathname;
  const classes = useStyles(active);

  const onClick = id => {
    history.push(`/accounts/${id}`);
  };

  return (
    <TableRow
      key={row.id}
      onClick={() => onClick(row.id)}
      className={classes.row}
    >
      <TableCell scope="row">{row.name}</TableCell>
      <TableCell align="right" className={classes.balance}>
        {row.balance}
        {user.currency}
      </TableCell>
    </TableRow>
  );
};

ListItem.propTypes = {
  row: PropTypes.objectOf(PropTypes.any).isRequired
};

export default AccountList;

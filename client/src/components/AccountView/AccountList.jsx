import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  active: {
    backgroundColor: theme.palette.action.selected
  },
  balance: {
    color: '#38bec9'
  }
}));

const AccountList = () => {
  const accounts = useSelector(state => state.accounts);
  const user = useSelector(state => state.user);
  const history = useHistory();
  const classes = useStyles();

  const onClick = id => {
    history.push(`/accounts/${id}`);
  };

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          {accounts.map(row => (
            <TableRow
              key={row.id}
              onClick={() => onClick(row.id)}
              className={classes.row}
              activeClassName={classes.active}
            >
              <TableCell scope="row">{row.name}</TableCell>
              <TableCell align="right" className={classes.balance}>
                {row.balance}
                {user.currency}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountList;

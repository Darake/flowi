import React from 'react';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Balance from '../Shared/Balance';

const TransactionsTable = () => {
  const transactions = useSelector(state => state.transactions);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Source</TableCell>
            <TableCell>Target</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.sourceAccount.name}
              </TableCell>
              <TableCell>{row.targetCategory.name}</TableCell>
              <TableCell align="right">
                <Balance balance={row.amount} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;

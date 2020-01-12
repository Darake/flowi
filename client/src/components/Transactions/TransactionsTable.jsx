import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Balance from '../Shared/Balance';

const TransactionRow = ({ transaction }) => {
  if (transaction.targetCategory) {
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          Outflow
        </TableCell>
        <TableCell>
          {`${transaction.sourceAccount.name} -> ${transaction.targetCategory.name}`}
        </TableCell>
        <TableCell align="right">
          <Balance balance={transaction.amount} outflow />
        </TableCell>
      </TableRow>
    );
  }

  if (transaction.sourceAccount) {
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          Transfer
        </TableCell>
        <TableCell>
          {`${transaction.sourceAccount.name} -> ${transaction.targetAccount.name}`}
        </TableCell>
        <TableCell align="right">
          <Balance balance={transaction.amount} />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        Inflow
      </TableCell>
      <TableCell>{transaction.targetAccount.name}</TableCell>
      <TableCell align="right">
        <Balance balance={transaction.amount} />
      </TableCell>
    </TableRow>
  );
};

TransactionRow.propTypes = {
  transaction: PropTypes.objectOf(PropTypes.any).isRequired
};

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
            <TransactionRow key={row.id} transaction={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;

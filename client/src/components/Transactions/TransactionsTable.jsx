import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Balance from '../Shared/Balance';

const TransactionsTable = ({ account }) => {
  let transactions = useSelector(state => state.transactions);
  if (account) {
    transactions = transactions.filter(
      t =>
        (t.sourceAccount && t.sourceAccount.id === account.id) ||
        (t.targetAccount && t.targetAccount.id === account.id)
    );
  }

  const transactionDetails = transaction => {
    if (transaction.targetCategory) {
      return {
        type: 'Outflow',
        info: `${transaction.sourceAccount.name} -> ${transaction.targetCategory.name}`,
        outflow: true
      };
    }
    if (transaction.sourceAccount) {
      return {
        type: 'Transfer',
        info: `${transaction.sourceAccount.name} -> ${transaction.targetAccount.name}`,
        outflow: account ? transaction.sourceAccount.id === account.id : false
      };
    }
    return {
      type: 'Inflow',
      info: transaction.targetAccount.name,
      outflow: false
    };
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableBody>
          {transactions.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {transactionDetails(row).type}
              </TableCell>
              <TableCell>{transactionDetails(row).info}</TableCell>
              <TableCell align="right">
                <Balance
                  balance={row.amount}
                  outflow={transactionDetails(row).outflow}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TransactionsTable.propTypes = {
  account: PropTypes.objectOf(PropTypes.any)
};

TransactionsTable.defaultProps = {
  account: undefined
};

export default TransactionsTable;

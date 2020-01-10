import React from 'react';
import Header from '../Shared/Header';
import TransactionAddingDialog from './TransactionAddingDialog';
import TransactionsTable from './TransactionsTable';

const TransactionView = () => {
  return (
    <>
      <Header title="Transactions">
        <TransactionAddingDialog />
      </Header>
      <TransactionsTable />
    </>
  );
};

export default TransactionView;

import React from 'react';
import Header from '../Shared/Header';
import TransactionAddingDialog from './TransactionAddingDialog';

const TransactionView = () => {
  return (
    <>
      <Header title="Transactions">
        <TransactionAddingDialog />
      </Header>
    </>
  );
};

export default TransactionView;

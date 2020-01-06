import React, { useState } from 'react';
import BudgetTable from './BudgetTable';
import BudgetDialog from './BudgetDialog';
import BudgetCreation from '../BudgetCreation';
import Header from '../Shared/Header';

const BudgetView = () => {
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);

  return (
    <div>
      <BudgetDialog open={budgetDialogOpen} setOpen={setBudgetDialogOpen} />
      <Header title="Budget">
        <BudgetCreation />
      </Header>
      <BudgetTable setBudgetDialogOpen={setBudgetDialogOpen} />
    </div>
  );
};

export default BudgetView;

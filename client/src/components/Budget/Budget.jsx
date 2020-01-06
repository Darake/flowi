import React, { useState } from 'react';
import BudgetTable from './BudgetTable';
import CategoryDialog from './CategoryDialog';
import CategoryCreationDialog from './CategoryCreationDialog';
import Header from '../Shared/Header';

const Budget = () => {
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);

  return (
    <div>
      <CategoryDialog open={budgetDialogOpen} setOpen={setBudgetDialogOpen} />
      <Header title="Budget">
        <CategoryCreationDialog />
      </Header>
      <BudgetTable setBudgetDialogOpen={setBudgetDialogOpen} />
    </div>
  );
};

export default Budget;

import React, { useState } from 'react';
import BudgetTable from './BudgetTable';
import CategoryDialog from './CategoryDialog';
import CategoryCreationDialog from './CategoryCreationDialog';
import Header from '../Shared/Header';

const Budget = () => {
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  return (
    <div>
      <CategoryDialog
        open={categoryDialogOpen}
        setOpen={setCategoryDialogOpen}
      />
      <Header title="Budget">
        <CategoryCreationDialog />
      </Header>
      <BudgetTable setCategoryDialogOpen={setCategoryDialogOpen} />
    </div>
  );
};

export default Budget;

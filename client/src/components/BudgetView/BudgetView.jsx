import React, { useState } from 'react';
import BudgetHeader from './BudgetHeader';
import BudgetTable from './BudgetTable';
import BudgetDialog from './BudgetDialog';

const BudgetView = () => {
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);

  return (
    <div>
      <BudgetDialog open={budgetDialogOpen} setOpen={setBudgetDialogOpen} />
      <BudgetHeader />
      <BudgetTable setBudgetDialogOpen={setBudgetDialogOpen} />
    </div>
  );
};

export default BudgetView;

import React, { useState } from 'react';
import BudgetHeader from './BudgetHeader';
import BudgetTable from './BudgetTable';
import BudgetDialog from './BudgetDialog';

const BudgetView = () => {
  const [fundsAddingDialogOpen, setFundsAddingDialogOpen] = useState(false);
  const [clickedCategory, setClickedCategory] = useState(null);

  return (
    <div>
      <BudgetDialog
        open={fundsAddingDialogOpen}
        setOpen={setFundsAddingDialogOpen}
        budget={clickedCategory}
      />
      <BudgetHeader />
      <BudgetTable
        setClickedCategory={setClickedCategory}
        setAddingDialogOpen={setFundsAddingDialogOpen}
      />
    </div>
  );
};

export default BudgetView;

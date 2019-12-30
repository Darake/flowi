import React, { useState } from 'react';
import BudgetFundsAdding from './BudgetFundsAdding';
import BudgetHeader from './BudgetHeader';
import BudgetTable from './BudgetTable';

const BudgetView = () => {
  const [fundsAddingDialogOpen, setFundsAddingDialogOpen] = useState(false);
  const [clickedCategory, setClickedCategory] = useState(null);

  return (
    <div>
      <BudgetFundsAdding
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

import React, { useState } from 'react';
import BudgetAdding from './BudgetAdding';
import BudgetHeader from './BudgetHeader';
import BudgetTable from './BudgetTable';

const BudgetView = () => {
  const [addingDialogOpen, setAddingDialogOpen] = useState(false);
  const [clickedCategory, setClickedCategory] = useState(null);

  return (
    <div>
      <BudgetAdding
        open={addingDialogOpen}
        setOpen={setAddingDialogOpen}
        budget={clickedCategory}
      />
      <BudgetHeader />
      <BudgetTable
        setClickedCategory={setClickedCategory}
        setAddingDialogOpen={setAddingDialogOpen}
      />
    </div>
  );
};

export default BudgetView;

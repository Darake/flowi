import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import FundsAdditionForm from './FundsAdditionForm';

const BudgetFundsAdding = ({ setOpen, budget }) => {
  const budgetName = budget ? budget.name : 'placeholder';

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogTitle id="fund-adding">{`Add funds to ${budgetName}`}</DialogTitle>
      <FundsAdditionForm
        setOpen={setOpen}
        handleClose={handleClose}
        budget={budget}
      />
    </>
  );
};

BudgetFundsAdding.defaultProps = {
  budget: null
};

BudgetFundsAdding.propTypes = {
  setOpen: PropTypes.func.isRequired,
  budget: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  })
};

export default BudgetFundsAdding;

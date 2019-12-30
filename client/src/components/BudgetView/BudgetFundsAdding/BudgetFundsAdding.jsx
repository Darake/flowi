import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import FundsAdditionForm from './FundsAdditionForm';

const BudgetFundsAdding = ({ open, setOpen, budget }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const budgetName = budget ? budget.name : 'placeholder';

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="fund-adding"
    >
      <DialogTitle id="fund-adding">{`Add funds to ${budgetName}`}</DialogTitle>
      <FundsAdditionForm
        setOpen={setOpen}
        handleClose={handleClose}
        budget={budget}
      />
    </Dialog>
  );
};

BudgetFundsAdding.defaultProps = {
  budget: null
};

BudgetFundsAdding.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  budget: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  })
};

export default BudgetFundsAdding;

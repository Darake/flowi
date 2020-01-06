import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DialogContentText from '@material-ui/core/DialogContentText';
import FundFieldArray from '../BudgetView/BudgetFundsAdding/FundFieldArray';

const TransactionFundAdding = ({
  show,
  values,
  setFieldValue,
  errors,
  ...props
}) => {
  const category = useSelector(state => state.selectedBudget);
  const { currency } = useSelector(state => state.user);
  const fundsNeeded = values.amount - category.balance;

  if (!show) return null;

  return (
    <div {...props}>
      <DialogContentText color="error">
        {`Not enough budgeted for ${category.name}. Please budget at least ${fundsNeeded}${currency} more below.`}
      </DialogContentText>
      <FundFieldArray
        values={values}
        setFieldValue={setFieldValue}
        errors={errors}
      />
    </div>
  );
};

TransactionFundAdding.propTypes = {
  show: PropTypes.bool.isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired,
  setFieldValue: PropTypes.func.isRequired
};

export default TransactionFundAdding;

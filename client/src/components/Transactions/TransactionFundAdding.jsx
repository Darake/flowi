import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DialogContentText from '@material-ui/core/DialogContentText';
import FundSourceFieldArray from '../Budget/CategoryFundsAdding/FundSourceFieldArray';

const TransactionFundAdding = ({ show, values, setFieldValue, ...props }) => {
  const category = useSelector(state => state.selectedCategory);
  const { currency } = useSelector(state => state.user);
  const fundsNeeded = values.amount - category.balance;

  if (!show) return null;

  return (
    <div {...props}>
      <DialogContentText color="error">
        {`Not enough budgeted for ${category.name}. Budget at least ${fundsNeeded}${currency} more below.`}
      </DialogContentText>
      <FundSourceFieldArray values={values} setFieldValue={setFieldValue} />
    </div>
  );
};

TransactionFundAdding.propTypes = {
  show: PropTypes.bool.isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired,
  setFieldValue: PropTypes.func.isRequired
};

export default TransactionFundAdding;

import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import { FormikTextField } from '../Shared/MaterialFormikFields';
import SelectWithItems from './SelectWithItems';

const useStyles = makeStyles(theme => ({
  accountAndAmount: {
    display: 'flex',
    marginBottom: theme.spacing(3)
  },
  account: {
    flexGrow: 1,
    marginRight: theme.spacing(1)
  },
  amount: {
    width: '100px'
  }
}));

const AccountAndAmountField = ({
  accountName,
  amountName,
  handleAccountChange,
  handleAmountChange
}) => {
  const classes = useStyles();
  const accounts = useSelector(state => state.accounts);
  const { currency } = useSelector(state => state.user);

  return (
    <div className={classes.accountAndAmount}>
      <SelectWithItems
        name={accountName}
        label="Account"
        fieldClassName={classes.account}
        handleChange={handleAccountChange}
        items={accounts}
      />
      <FormikTextField
        name={amountName}
        label="Amount"
        type="number"
        className={classes.amount}
        onChange={handleAmountChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{currency}</InputAdornment>
          )
        }}
      />
    </div>
  );
};

AccountAndAmountField.propTypes = {
  accountName: PropTypes.string.isRequired,
  amountName: PropTypes.string.isRequired,
  handleAccountChange: PropTypes.func,
  handleAmountChange: PropTypes.func
};

AccountAndAmountField.defaultProps = {
  handleAccountChange: undefined,
  handleAmountChange: undefined
};

export default AccountAndAmountField;

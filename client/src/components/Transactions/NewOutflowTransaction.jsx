import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TransactionFundAdding from './TransactionFundAdding';
import {
  setCategory,
  resetCategory
} from '../../reducers/selectedCategoryReducer';
import { setNotification } from '../../reducers/notificationReducer';
import { updateCategory } from '../../reducers/categoryReducer';
import { createOutflowTransaction } from '../../reducers/transactionReducer';
import { findById } from '../../utils';
import DialogActionButtons from '../Shared/DialogActionButtons';
import { useSharedStyles } from '../Shared/SharedStyles';
import AccountAndAmountField from './AccountAndAmountField';
import SelectWithItems from './SelectWithItems';
import { FormikDatePicker } from '../Shared/MaterialFormikFields';

const useStyles = makeStyles(theme => ({
  fundAdding: {
    marginTop: theme.spacing(6)
  },
  transactionDate: {
    marginTop: theme.spacing(5)
  }
}));

const NewOutflowTransaction = ({ handleClose, hidden }) => {
  const classes = useStyles();
  const sharedClasses = useSharedStyles();
  const dispatch = useDispatch();
  const [fundAdding, setFundAdding] = useState(false);
  const accounts = useSelector(state => state.accounts);
  const categories = useSelector(state => state.categories);
  const fundError = useSelector(state => state.notification);

  if (hidden) return null;

  const valueSelected = value => value !== '';

  const subtractFromCategory = source => {
    const sourceCategory = findById(categories, source.object);
    dispatch(
      updateCategory({
        ...sourceCategory,
        balance: Number(sourceCategory.balance) - Number(source.addition)
      })
    );
  };

  const addToCategory = async (values, addition) => {
    const selectedCategory = findById(categories, values.category);
    await dispatch(
      updateCategory({
        ...selectedCategory,
        balance: Number(addition) + Number(selectedCategory.balance)
      })
    );
  };

  const updateCategories = async values => {
    const totalAddition = values.fundSources.reduce((sum, source) => {
      if (source.object === 'Accounts') {
        return sum + Number(source.addition);
      }
      if (valueSelected(source.object)) {
        subtractFromCategory(source);
        return sum + Number(source.addition);
      }
      return sum;
    }, 0);

    addToCategory(values, totalAddition);
  };

  const enoughBudgeted = values => {
    const selectedCategory = findById(categories, values.category);
    const totalBudgeted = values.fundSources.reduce(
      (sum, source) => Number(sum) + Number(source.addition),
      0
    );
    return selectedCategory.balance + totalBudgeted >= values.amount;
  };

  const handleSubmit = async values => {
    if (fundAdding && !enoughBudgeted(values)) {
      dispatch(setNotification(`Please add more funds to selected category`));
    } else {
      if (fundAdding) {
        await updateCategories(values);
      }
      await dispatch(
        createOutflowTransaction(
          findById(accounts, values.account),
          findById(categories, values.category),
          values.amount,
          values.outflowDate
        )
      );
      handleClose();
    }
  };

  const handleCategoryChange = (e, values, setFieldValue) => {
    const selectedCategory = findById(categories, e.target.value);
    setFieldValue('category', e.target.value);
    if (
      valueSelected(e.target.value) &&
      selectedCategory.balance < values.amount
    ) {
      dispatch(setCategory(selectedCategory));
      setFundAdding(true);
    } else {
      setFundAdding(false);
      dispatch(resetCategory());
    }
  };

  const updateCategoryField = (values, updatedAmount, setFieldValue) => {
    const fakeEvent = { target: { value: values.category } };
    const updatedValues = { ...values, amount: updatedAmount };
    handleCategoryChange(fakeEvent, updatedValues, setFieldValue);
  };

  const handleAmountChange = (e, values, setFieldValue) => {
    const selectedAccount = findById(accounts, values.account);
    let newAmount;
    if (selectedAccount && selectedAccount.balance < e.target.value) {
      newAmount = selectedAccount.balance;
    } else if (e.target.value < 0) {
      newAmount = 0;
    } else {
      newAmount = e.target.value;
    }
    setFieldValue('amount', newAmount);
    updateCategoryField(values, newAmount, setFieldValue);
  };

  const updateAmountField = (values, updatedAccountId, setFieldValue) => {
    const fakeEvent = { target: { value: values.amount } };
    const updatedValues = { ...values, account: updatedAccountId };
    handleAmountChange(fakeEvent, updatedValues, setFieldValue);
  };

  const handleAccountChange = (e, values, setFieldValue) => {
    const selectedAccount = findById(accounts, e.target.value);
    setFieldValue('account', e.target.value);
    if (
      valueSelected(values.amount) &&
      selectedAccount.balance < values.amount
    ) {
      updateAmountField(values, selectedAccount.id, setFieldValue);
    }
  };

  const transactionValidationSchema = Yup.object().shape({
    account: Yup.string().required('Please choose an account'),
    amount: Yup.number()
      .required('Please enter the transaction amount')
      .min(1, 'Amount needs to be greater than 0'),
    category: Yup.string().required('Please choose a target category'),
    outflowDate: Yup.date('Invalid Date Format').required()
  });

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <DialogTitle>New outflow transaction</DialogTitle>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={transactionValidationSchema}
        initialValues={{
          account: '',
          category: '',
          amount: '',
          outflowDate: new Date(),
          fundSources: [{ object: '', addition: '' }]
        }}
      >
        {({ values, setFieldValue, setFieldError }) => (
          <Form className={sharedClasses.dialogForm}>
            <DialogContent>
              <DialogContentText>
                Select account, target category and the transaction amount.
              </DialogContentText>
              <AccountAndAmountField
                accountName="account"
                amountName="amount"
                handleAccountChange={e =>
                  handleAccountChange(e, values, setFieldValue)
                }
                handleAmountChange={e =>
                  handleAmountChange(e, values, setFieldValue)
                }
              />
              <SelectWithItems
                name="category"
                label="Category"
                handleChange={e =>
                  handleCategoryChange(e, values, setFieldValue)
                }
                items={categories}
                fullWidth
                data-cy="transaction-category"
              />
              <FormikDatePicker
                name="outflowDate"
                label="Transaction date"
                setFieldError={setFieldError}
                onChange={value => setFieldValue('inflowDate', value, false)}
                fullWidth
                className={classes.transactionDate}
              />
              <TransactionFundAdding
                show={fundAdding}
                values={values}
                setFieldValue={setFieldValue}
                className={classes.fundAdding}
              />
              {fundError ? (
                <DialogContentText color="error">{fundError}</DialogContentText>
              ) : null}
            </DialogContent>
            <DialogActionButtons
              handleClose={handleClose}
              dialogActionClassName={sharedClasses.dialogButtons}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

NewOutflowTransaction.propTypes = {
  handleClose: PropTypes.func.isRequired,
  hidden: PropTypes.bool.isRequired
};

export default NewOutflowTransaction;

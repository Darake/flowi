import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import InputAdornment from '@material-ui/core/InputAdornment';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuItem from '@material-ui/core/MenuItem';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  FormikSelectField,
  FormikTextField
} from '../Shared/MaterialFormikFields';
import TransactionFundAdding from './TransactionFundAdding';
import {
  setCategory,
  resetCategory
} from '../../reducers/selectedCategoryReducer';
import { setNotification } from '../../reducers/notificationReducer';
import { updateAccount } from '../../reducers/accountReducer';
import { updateCategory } from '../../reducers/categoryReducer';
import { useResourceService } from '../../services/resources';

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
  },
  fundAdding: {
    marginTop: theme.spacing(6)
  }
}));

const TransactionAddingDialog = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [fundAdding, setFundAdding] = useState(false);
  const accounts = useSelector(state => state.accounts);
  const categories = useSelector(state => state.categories);
  const { currency } = useSelector(state => state.user);
  const fundError = useSelector(state => state.notification);
  const transactionService = useResourceService('/api/transactions');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFundAdding(false);
    setOpen(false);
  };

  const updateCategories = async values => {
    const totalAddition = values.fundSources.reduce((sum, source) => {
      if (source.object === 'Accounts') {
        return sum + Number(source.addition);
      }
      if (source.object !== '') {
        const sourceCategory = categories.filter(
          c => c.id === source.object
        )[0];
        const updatedSourceCategory = {
          ...sourceCategory,
          balance: Number(sourceCategory.balance) - Number(source.addition)
        };
        dispatch(updateCategory(updatedSourceCategory));
        return sum + Number(source.addition);
      }
      return sum;
    }, 0);
    const selectedCategory = categories.filter(
      c => c.id === values.category
    )[0];
    const updatedCategory = {
      ...selectedCategory,
      balance: Number(totalAddition) + Number(selectedCategory.balance)
    };
    await dispatch(updateCategory(updatedCategory));
  };

  const enoughBudgeted = values => {
    const selectedCategory = categories.filter(
      b => b.id === values.category
    )[0];
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
      await updateCategories(values);
      const createdTransaction = await transactionService.create({
        sourceAccount: values.account,
        targetBudget: values.category,
        amount: values.amount
      });
      const sourceAccount = accounts.filter(a => a.id === values.account)[0];
      await dispatch(
        updateAccount({
          ...sourceAccount,
          balance: sourceAccount.balance - values.amount,
          transactions: sourceAccount.transactions.concat(createdTransaction.id)
        })
      );
      const targetCategory = categories.filter(
        c => c.id === values.category
      )[0];
      const totalBudgeted = values.fundSources.reduce(
        (sum, source) => Number(sum) + Number(source.addition),
        0
      );
      await dispatch(
        updateCategory({
          ...targetCategory,
          balance: targetCategory.balance - values.amount + totalBudgeted
        })
      );
      handleClose();
    }
  };

  const valueSelected = value => value !== '';

  const handleCategoryChange = (e, values, setFieldValue) => {
    const selectedCategory = categories.filter(b => b.id === e.target.value)[0];
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
    const selectedAccount = accounts.filter(a => a.id === values.account)[0];
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

  const updateAmount = (values, updatedAccountId, setFieldValue) => {
    const fakeEvent = { target: { value: values.amount } };
    const updatedValues = { ...values, account: updatedAccountId };
    handleAmountChange(fakeEvent, updatedValues, setFieldValue);
  };

  const handleAccountChange = (e, values, setFieldValue) => {
    const selectedAccount = accounts.filter(a => a.id === e.target.value)[0];
    setFieldValue('account', e.target.value);
    if (
      valueSelected(values.amount) &&
      selectedAccount.balance < values.amount
    ) {
      updateAmount(values, selectedAccount.id, setFieldValue);
    }
  };

  const transactionValidationSchema = Yup.object().shape({
    account: Yup.string().required('Please choose an account'),
    amount: Yup.number()
      .required('Please enter the transaction amount')
      .min(1, 'Amount needs to be greater than 0'),
    category: Yup.string().required('Please choose a target category')
  });

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleOpen}
      >
        ADD TRANSACTION
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle>New transaction</DialogTitle>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={transactionValidationSchema}
          initialValues={{
            account: '',
            category: '',
            amount: '',
            fundSources: [{ object: '', addition: '' }]
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <DialogContent>
                <DialogContentText>
                  Select account, target category and the transaction amount.
                </DialogContentText>
                <div className={classes.accountAndAmount}>
                  <FormikSelectField
                    name="account"
                    label="Account"
                    formControlClassName={classes.account}
                    onChange={e =>
                      handleAccountChange(e, values, setFieldValue)
                    }
                  >
                    {accounts.map(account => (
                      <MenuItem key={account.id} value={account.id}>
                        {account.name}
                      </MenuItem>
                    ))}
                  </FormikSelectField>
                  <FormikTextField
                    name="amount"
                    label="Amount"
                    type="number"
                    className={classes.amount}
                    onChange={e => handleAmountChange(e, values, setFieldValue)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {currency}
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <FormikSelectField
                  name="category"
                  label="Category"
                  onChange={e => handleCategoryChange(e, values, setFieldValue)}
                  fullWidth
                >
                  {categories.map(budget => (
                    <MenuItem key={budget.id} value={budget.id}>
                      {budget.name}
                    </MenuItem>
                  ))}
                </FormikSelectField>
                <TransactionFundAdding
                  show={fundAdding}
                  values={values}
                  setFieldValue={setFieldValue}
                  className={classes.fundAdding}
                />
                {fundError ? (
                  <DialogContentText color="error">
                    {fundError}
                  </DialogContentText>
                ) : null}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>CANCEL</Button>
                <Button type="submit" color="primary">
                  SAVE
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default TransactionAddingDialog;

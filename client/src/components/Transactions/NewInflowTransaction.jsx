import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormikSelectField,
  FormikTextField
} from '../Shared/MaterialFormikFields';
import DialogActionButtons from '../Shared/DialogActionButtons';
import { createInflowTransaction } from '../../reducers/transactionReducer';
import { findById } from '../../utils';
import { useSharedStyles } from '../Shared/SharedStyles';

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

const NewInflowTransaction = ({ handleClose }) => {
  const classes = useStyles();
  const sharedClasses = useSharedStyles();
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.accounts);
  const { currency } = useSelector(state => state.user);

  const handleSubmit = async values => {
    await dispatch(
      createInflowTransaction(
        findById(accounts, values.inflowAccount),
        values.inflowAmount
      )
    );
    handleClose();
  };

  const inflowValidationSchema = Yup.object().shape({
    inflowAccount: Yup.string().required('Please choose an account'),
    inflowAmount: Yup.number().required('Please enter the transaction amount')
  });

  return (
    <>
      <DialogTitle>New inflow transaction</DialogTitle>
      <Formik
        initialValues={{
          inflowAccount: '',
          inflowAmount: ''
        }}
        validationSchema={inflowValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={sharedClasses.dialogForm}>
          <DialogContent>
            <DialogContentText>
              Select a target account and amount.
            </DialogContentText>
            <div className={classes.accountAndAmount}>
              <FormikSelectField
                name="inflowAccount"
                label="Account"
                formControlClassName={classes.account}
              >
                {accounts.map(account => (
                  <MenuItem key={account.id} value={account.id}>
                    {account.name}
                  </MenuItem>
                ))}
              </FormikSelectField>
              <FormikTextField
                name="inflowAmount"
                label="Amount"
                type="number"
                className={classes.amount}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">{currency}</InputAdornment>
                  )
                }}
              />
            </div>
          </DialogContent>
          <DialogActionButtons
            handleClose={handleClose}
            dialogActionClassName={sharedClasses.dialogButtons}
          />
        </Form>
      </Formik>
    </>
  );
};

NewInflowTransaction.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default NewInflowTransaction;

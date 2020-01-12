import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Box from '@material-ui/core/Box';
import AccountAndAmountField from './AccountAndAmountField';
import DialogActionButtons from '../Shared/DialogActionButtons';
import { createInflowTransaction } from '../../reducers/transactionReducer';
import { findById } from '../../utils';
import { useSharedStyles } from '../Shared/SharedStyles';

const NewInflowTransaction = ({ handleClose, hidden }) => {
  const sharedClasses = useSharedStyles();
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.accounts);

  if (hidden) return null;

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
    <Box height="100%" display="flex" flexDirection="column">
      <DialogTitle>New inflow transaction</DialogTitle>
      <Formik
        initialValues={{
          inflowAccount: '',
          inflowAmount: ''
        }}
        validationSchema={inflowValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange }) => (
          <Form className={sharedClasses.dialogForm}>
            <DialogContent>
              <DialogContentText>
                Select a target account and amount.
              </DialogContentText>
              <AccountAndAmountField
                accountName="inflowAccount"
                amountName="inflowAmount"
                handleAccountChange={handleChange}
                handleAmountChange={handleChange}
              />
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

NewInflowTransaction.propTypes = {
  handleClose: PropTypes.func.isRequired,
  hidden: PropTypes.bool.isRequired
};

export default NewInflowTransaction;

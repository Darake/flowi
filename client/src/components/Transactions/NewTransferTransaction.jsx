import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AccountAndAmountField from './AccountAndAmountField';
import SelectWithItems from './SelectWithItems';
import DialogActionButtons from '../Shared/DialogActionButtons';
import { useSharedStyles } from '../Shared/SharedStyles';
import { findById } from '../../utils';
import { createTransfer } from '../../reducers/transactionReducer';

const NewTransferTransaction = ({ handleClose, hidden }) => {
  const sharedClasses = useSharedStyles();
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.accounts);

  const accountsExcludingSource = sourceId => {
    return accounts.filter(account => account.id !== sourceId);
  };

  const accountById = id => findById(accounts, id);

  const handleSourceChange = (e, values, setFieldValue) => {
    setFieldValue('sourceAccount', e.target.value);
    const selectedSourceAccount = accountById(e.target.value);
    if (selectedSourceAccount.balance < values.transferAmount) {
      setFieldValue('transferAmount', selectedSourceAccount.balance);
    }
  };

  const handleAmountChange = (e, values, setFieldValue) => {
    const selectedSourceAccount = accountById(values.sourceAccount);
    if (e.target.value < 0) setFieldValue('transferAmount', 0);
    else if (
      selectedSourceAccount &&
      e.target.value > selectedSourceAccount.balance
    ) {
      setFieldValue('transferAmount', selectedSourceAccount.balance);
    } else setFieldValue('transferAmount', e.target.value);
  };

  const handleSubmit = async values => {
    await dispatch(
      createTransfer(
        accountById(values.sourceAccount),
        accountById(values.targetAccount),
        Number(values.transferAmount)
      )
    );
    handleClose();
  };

  const transferValidationSchema = Yup.object().shape({
    sourceAccount: Yup.string().required('Choose a source account'),
    targetAccount: Yup.string().required('Choose a target account'),
    transferAmount: Yup.number()
      .required('Enter transfer amount')
      .min(1, 'Amount cant be 0')
  });

  return (
    <Box hidden={hidden}>
      <DialogTitle>Transfer funds between accounts</DialogTitle>
      <Formik
        initialValues={{
          sourceAccount: '',
          targetAccount: '',
          transferAmount: ''
        }}
        onSubmit={handleSubmit}
        validationSchema={transferValidationSchema}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form className={sharedClasses.dialogForm}>
            <DialogContent>
              <DialogContentText>
                Select source and target amount with the transfer amount.
              </DialogContentText>
              <AccountAndAmountField
                accountName="sourceAccount"
                amountName="transferAmount"
                handleAccountChange={e =>
                  handleSourceChange(e, values, setFieldValue)
                }
                handleAmountChange={e =>
                  handleAmountChange(e, values, setFieldValue)
                }
              />
              <SelectWithItems
                name="targetAccount"
                label="Target account"
                handleChange={handleChange}
                items={accountsExcludingSource(values.sourceAccount)}
                fullWidth
              />
            </DialogContent>
            <DialogActionButtons handleClose={handleClose} />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

NewTransferTransaction.propTypes = {
  handleClose: PropTypes.func.isRequired,
  hidden: PropTypes.bool.isRequired
};

export default NewTransferTransaction;

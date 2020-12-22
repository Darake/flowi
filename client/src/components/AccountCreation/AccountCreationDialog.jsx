import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import DialogActionButtons from '../Shared/DialogActionButtons';
import {
  FormikTextField,
  FormikAmountField
} from '../Shared/MaterialFormikFields';
import { createAccount } from '../../reducers/accountReducer';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  account: {
    marginBottom: theme.spacing(3)
  }
}));

const AccountCreationDialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async ({ accountName, startingBalance }) => {
    await dispatch(
      createAccount({ name: accountName, balance: Number(startingBalance) })
    );
    handleClose();
  };

  const accountSchema = Yup.object().shape({
    accountName: Yup.string().required('Account name required.'),
    startingBalance: Yup.number()
      .required('Starting balance required.')
      .min(0, 'Starting balance cant be negative')
  });

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        size="small"
        onClick={handleOpen}
        data-cy="add-account-button"
      >
        Add Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        data-cy="account-creation-dialog"
      >
        <Formik
          initialValues={{
            accountName: '',
            startingBalance: ''
          }}
          validationSchema={accountSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <DialogTitle>Account creation</DialogTitle>
            <DialogContent>
              <FormikTextField
                name="accountName"
                label="Account name"
                fullWidth
                autoFocus
                className={classes.account}
                data-cy="account-name-field"
              />

              <FormikAmountField
                name="startingBalance"
                label="Starting balance"
                fullWidth
                data-cy="account-balance-field"
              />
            </DialogContent>
            <DialogActionButtons handleClose={handleClose} />
          </Form>
        </Formik>
      </Dialog>
    </>
  );
};

export default AccountCreationDialog;

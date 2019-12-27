import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import MaterialField from '../Shared/MaterialComponents';
import { createAccount } from '../../reducers/accountReducer';

const useStyles = makeStyles(theme => ({
  submit: {
    marginTop: theme.spacing(2)
  }
}));

const AccountCreation = ({ closeModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async ({ accountName, startingBalance }) => {
    await dispatch(createAccount(accountName, Number(startingBalance)));
    if (closeModal) {
      closeModal();
    } else {
      history.push('/accounts');
    }
  };

  const accountSchema = Yup.object().shape({
    accountName: Yup.string().required('Account name required.'),
    startingBalance: Yup.number()
      .typeError('Starting balance needs to be a number.')
      .required('Starting balance required.')
  });

  return (
    <Box mt={10}>
      <Typography component="h1" variant="h6">
        Account creation
      </Typography>
      <Formik
        initialValues={{
          accountName: '',
          startingBalance: ''
        }}
        validationSchema={accountSchema}
        onSubmit={handleSubmit}
        render={formikProps => {
          return (
            <Form>
              <MaterialField
                type="text"
                name="accountName"
                label="Account name"
                {...formikProps}
              />

              <MaterialField
                type="text"
                name="startingBalance"
                label="Starting balance"
                {...formikProps}
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                className={classes.submit}
              >
                CONFIRM
              </Button>
            </Form>
          );
        }}
      />
    </Box>
  );
};

AccountCreation.propTypes = {
  closeModal: PropTypes.func
};

AccountCreation.defaultProps = {
  closeModal: undefined
};

export default AccountCreation;

import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import accountService from '../../services/accounts';

const AccountCreation = ({ accounts, setAccounts }) => {
  const handleSubmit = async ({ accountName, startingBalance }) => {
    const savedAccount = await accountService.create({
      name: accountName,
      balance: startingBalance
    });

    setAccounts(accounts.concat(savedAccount));
  };

  const accountSchema = Yup.object().shape({
    accountName: Yup.string().required('Account name required'),
    startingBalance: Yup.number()
      .typeError('Starting balance needs to be a number')
      .required('Starting balance required')
  });

  return (
    <div>
      Account creation
      <Formik
        initialValues={{
          accountName: '',
          startingBalance: ''
        }}
        validationSchema={accountSchema}
        onSubmit={handleSubmit}
        render={() => {
          return (
            <Form>
              <label htmlFor="accountName">Account name:</label>
              <Field type="text" name="accountName" id="accountName" />
              <ErrorMessage name="accountName" />

              <label htmlFor="startingBalance">Starting balance:</label>
              <Field type="text" name="startingBalance" id="startingBalance" />
              <ErrorMessage name="startingBalance" />

              <button type="submit">CONFIRM</button>
            </Form>
          );
        }}
      />
    </div>
  );
};

AccountCreation.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAccounts: PropTypes.func.isRequired
};

export default AccountCreation;

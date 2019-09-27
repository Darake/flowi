import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as accountActions from '../../reducers/accountReducer';

const AccountCreation = ({ createAccount, closeModal }) => {
  const handleSubmit = async ({ accountName, startingBalance }) => {
    createAccount(accountName, startingBalance);
    if (closeModal) closeModal();
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
  createAccount: PropTypes.func.isRequired,
  closeModal: PropTypes.func
};

AccountCreation.defaultProps = {
  closeModal: undefined
};

const mapDispatchToProps = { ...accountActions };

export default connect(
  null,
  mapDispatchToProps
)(AccountCreation);

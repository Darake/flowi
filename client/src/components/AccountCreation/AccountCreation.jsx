import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import * as accountActions from '../../reducers/accountReducer';

const AccountCreation = ({ createAccount, closeModal }) => {
  const handleSubmit = async ({ accountName, startingBalance }) => {
    createAccount(accountName, startingBalance);
    if (closeModal) closeModal();
  };

  const accountSchema = Yup.object().shape({
    accountName: Yup.string().required('Account name required.'),
    startingBalance: Yup.number()
      .typeError('Starting balance needs to be a number.')
      .required('Starting balance required.')
  });

  const Container = styled.div`
    background-color: white;
    border-radius: 8px;
    border: 2px solid #d9e2ec;
    border-top: 8px solid #62b0e8;
    width: 85%;
    max-width: 512px;
    padding: 32px 12px;
  `;

  const Header = styled.h2`
    font-size: 20px;
    margin: 0 0 32px 4px;
  `;

  const Label = styled.label`
    display: block;
    margin: 16px 0 8px 4px;
    color: #486581;
    font-size: 16px;
  `;

  const TextInput = styled(Field)`
    display: block;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: #f0f4f8;
    border: 2px solid #d9e2ec;
    width: 100%;
  `;

  const PrimaryButton = styled.button`
    border-radius: 8px;
    padding: 8px;
    margin: 16px 0;
    background-color: #4098d7;
    border: 2px solid #62b0e8;
    color: white;
    width: 100%;
  `;

  const Error = styled(ErrorMessage)`
    color: #d64545;
    border: 1px solid #ba2525;
    padding: 8px;
    border-radius: 4px;
    margin: 4px 0;
    width: 100%;
    box-sizing: border-box;
  `;

  return (
    <Container>
      <Header>Account creation</Header>
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
              <Label htmlFor="accountName">Account name</Label>
              <TextInput type="text" name="accountName" id="accountName" />

              <Label htmlFor="startingBalance">Starting balance</Label>
              <TextInput
                type="text"
                name="startingBalance"
                id="startingBalance"
              />

              <PrimaryButton type="submit">CONFIRM</PrimaryButton>

              <Error name="accountName" component="li" />
              <Error name="startingBalance" component="li" />
            </Form>
          );
        }}
      />
    </Container>
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

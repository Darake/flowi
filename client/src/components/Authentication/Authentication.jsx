import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, register } from '../../reducers/userReducer';

const Authentication = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);
  const [registration, setRegistration] = useState(false);

  const handleSubmit = (values, actions) => {
    const { email, password, currency } = values;
    if (registration) {
      dispatch(register(email, password, currency));
    } else {
      dispatch(login(email, password));
    }

    actions.setSubmitting(false);
  };

  const authSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email address required'),
    password: Yup.string()
      .required('Password required')
      .min(6, 'Password has to be atleast 6 long')
  });

  const View = styled.div`
    width: 100vw;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const FormView = styled.div`
    display: grid;
    width: 300px;
  `;

  const Header = styled.h1`
    font-family: 'Courgette', cursive;
    color: #38bec9;
    text-align: center;
  `;

  const StyledForm = styled(Form)`
    display: grid;
  `;

  const TextInput = styled(Field)`
    padding: 12px;
    box-sizing: border-box;
    margin: 8px 0;
    background-color: #d9e2ec;
    border-radius: 8px;
    border: 2px solid #bcccdc;
  `;

  const SelectInput = styled(Field)`
    border-radius: 8px;
    background-color: #d9e2ec;
    grid-column: 3;
    border: 2px solid #bcccdc;
  `;

  const errorCss = `
    color: red;
    margin: 4px 0;
  `;

  const FormikError = styled(ErrorMessage)`
    ${errorCss}
  `;

  const Error = styled.span`
    ${errorCss}
  `;

  const GridContainer = styled.div`
    display: grid;
    grid-row-gap: 8px;
  `;

  const Label = styled.label`
    grid-column: 1 / 3;
    text-align: left;
  `;

  const PrimaryButton = styled.button`
    border-radius: 8px;
    padding: 8px;
    background-color: #38bec9;
    border: 2px solid #2cb1bc;
    color: white;
    margin: 8px 0;
    grid-column: 1/4;
  `;

  const TertiaryButton = styled.button`
    background: none !important;
    border: none;
    padding: 0 !important;
    color: #069;
    text-decoration: underline;
    cursor: pointer;
    text-align: left;
    margin-top: 24px;
  `;

  return (
    <View>
      <FormView>
        <Header>flowi</Header>
        <Formik
          initialValues={{
            email: '',
            password: '',
            currency: 'EUR'
          }}
          validationSchema={authSchema}
          onSubmit={handleSubmit}
          render={({ isSubmitting }) => {
            return (
              <StyledForm>
                <TextInput type="text" name="email" placeholder="Email" />
                <FormikError name="email" component="span" />

                <TextInput
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <FormikError name="password" component="span" />
                <Error>{notification}</Error>
                {registration ? (
                  <GridContainer>
                    <Label htmlFor="currency">Choose a currency</Label>
                    <SelectInput
                      name="currency"
                      id="currency"
                      component="select"
                      placeholder="Your Currency"
                    >
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                      <option value="GPB">GBP</option>
                    </SelectInput>
                    <ErrorMessage name="currency" />

                    <PrimaryButton type="submit" disabled={isSubmitting}>
                      CONFIRM
                    </PrimaryButton>

                    <TertiaryButton
                      type="button"
                      onClick={() => setRegistration(false)}
                      key="1"
                      disabled={isSubmitting}
                    >
                      Already an user?
                    </TertiaryButton>
                  </GridContainer>
                ) : (
                  <GridContainer>
                    <PrimaryButton type="submit" disabled={isSubmitting}>
                      LOG IN
                    </PrimaryButton>

                    <TertiaryButton
                      type="button"
                      onClick={() => setRegistration(true)}
                      disabled={isSubmitting}
                    >
                      SIGN UP
                    </TertiaryButton>
                  </GridContainer>
                )}
              </StyledForm>
            );
          }}
        />
      </FormView>
    </View>
  );
};

export default Authentication;

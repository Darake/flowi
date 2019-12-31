import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import {
  FormikTextField,
  FormikSelectField
} from '../Shared/MaterialFormikFields';
import { login, register } from '../../reducers/userReducer';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  error: {
    color: 'red',
    margin: '4px 0'
  },
  formControl: {
    marginTop: theme.spacing(2)
  }
}));

const Authentication = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);
  const [registration, setRegistration] = useState(false);

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    if (registration) {
      setLabelWidth(inputLabel.current.offsetWidth);
    }
  }, [registration]);

  const handleSubmit = (values, actions) => {
    const { email, password, currency } = values;
    if (registration) {
      dispatch(register(email, password, currency));
    } else {
      dispatch(login(email, password));
    }

    actions.setSubmitting(false);
  };

  const authShape = {
    email: Yup.string()
      .email('Invalid email format')
      .required('Email address required'),
    password: Yup.string()
      .required('Password required')
      .min(6, 'Password has to be atleast 6 long')
  };

  if (registration) {
    authShape.currency = Yup.string().required('Please choose a currency');
  }

  const authSchema = Yup.object().shape(authShape);

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <h1
          style={{
            fontFamily: 'Courgette, cursive',
            color: '#2196f3'
          }}
        >
          flowi
        </h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
            currency: ''
          }}
          validationSchema={authSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {notification ? (
              <p className={classes.error}>{notification}</p>
            ) : null}

            <FormikTextField
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
            />

            <FormikTextField
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
            />

            {registration ? (
              <div>
                <FormikSelectField
                  name="currency"
                  label="Currency"
                  labelId="currency-label"
                  labelRef={inputLabel}
                  variant="outlined"
                  labelWidth={labelWidth}
                  fullWidth
                  formControlClassName={classes.formControl}
                >
                  <MenuItem value="€">EUR</MenuItem>
                  <MenuItem value="$">USD</MenuItem>
                  <MenuItem value="£">GPB</MenuItem>
                </FormikSelectField>

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  className={classes.submit}
                >
                  CONFIRM
                </Button>

                <Link
                  type="button"
                  component="button"
                  onClick={() => setRegistration(false)}
                  key="1"
                >
                  Already an user?
                </Link>
              </div>
            ) : (
              <div>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  className={classes.submit}
                >
                  LOG IN
                </Button>

                <Link
                  type="button"
                  onClick={() => setRegistration(true)}
                  component="button"
                >
                  SIGN UP
                </Link>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </Container>
  );
};

export default Authentication;

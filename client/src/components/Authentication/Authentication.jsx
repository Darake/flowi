import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
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

  const inputLabel = React.useRef(null);
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

  const authSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email address required'),
    password: Yup.string()
      .required('Password required')
      .min(6, 'Password has to be atleast 6 long'),
    currency: Yup.string().required('Please choose a currency')
  });

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
          render={({
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            errors,
            touched
          }) => {
            return (
              <Form>
                {notification ? (
                  <p className={classes.error}>{notification}</p>
                ) : null}

                <TextField
                  type="text"
                  name="email"
                  label="Email"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.email && touched.email && errors.email}
                  error={errors.email && touched.email}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                  error={errors.password && touched.password}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />

                {registration ? (
                  <div>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={errors.currency && touched.currency}
                      className={classes.formControl}
                    >
                      <InputLabel id="currency-label" ref={inputLabel}>
                        Currency
                      </InputLabel>
                      <Select
                        labelId="currency-label"
                        name="currency"
                        value={values.currency}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        labelWidth={labelWidth}
                      >
                        <MenuItem value="EUR">EUR</MenuItem>
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="GPB">GPB</MenuItem>
                      </Select>
                      <FormHelperText>
                        {errors.currency && touched.currency && errors.currency}
                      </FormHelperText>
                    </FormControl>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                    >
                      Already an user?
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                      component="button"
                    >
                      SIGN UP
                    </Link>
                  </div>
                )}
              </Form>
            );
          }}
        />
      </div>
    </Container>
  );
};

export default Authentication;

import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export const FormikTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        label={label}
        helperText={meta.error && meta.touched && meta.error}
        error={meta.error && meta.name}
        {...field}
        {...props}
      />
    </>
  );
};

FormikTextField.propTypes = {
  label: PropTypes.string.isRequired
};

export const FormikSelectField = ({ label, children, ...props }) => {
  const [field] = useField(props);

  return (
    <>
      <FormControl {...props}>
        <InputLabel>{label}</InputLabel>
        <Select {...field} {...props}>
          {children}
        </Select>
      </FormControl>
    </>
  );
};

FormikSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.any).isRequired
};

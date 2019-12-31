import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

export const FormikTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        label={label}
        helperText={meta.error && meta.touched && meta.error}
        error={meta.error && meta.touched}
        {...field}
        {...props}
      />
    </>
  );
};

FormikTextField.propTypes = {
  label: PropTypes.string.isRequired
};

export const FormikSelectField = ({
  label,
  children,
  labelRef,
  formControlClassName,
  labelId,
  labelWidth,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FormControl
        {...props}
        className={formControlClassName}
        error={meta.error && meta.touched}
      >
        <InputLabel ref={labelRef} id={labelId}>
          {label}
        </InputLabel>
        <Select {...field} {...props} labelId={labelId} labelWidth={labelWidth}>
          {children}
        </Select>
        <FormHelperText>
          {meta.error && meta.touched && meta.error}
        </FormHelperText>
      </FormControl>
    </>
  );
};

FormikSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
  labelRef: PropTypes.objectOf(PropTypes.any),
  formControlClassName: PropTypes.string,
  labelId: PropTypes.string,
  labelWidth: PropTypes.number
};

FormikSelectField.defaultProps = {
  labelRef: null,
  formControlClassName: null,
  labelId: null,
  labelWidth: null
};

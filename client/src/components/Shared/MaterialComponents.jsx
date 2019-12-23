import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const MaterialField = props => {
  const {
    name,
    type,
    label,
    values,
    handleChange,
    handleBlur,
    errors,
    touched
  } = props;

  return (
    <TextField
      type={type}
      name={name}
      id={name}
      label={label}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={errors[name] && touched[name] && errors[name]}
      error={errors[name] && touched[name]}
      margin="normal"
      variant="outlined"
      fullWidth
    />
  );
};

MaterialField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  touched: PropTypes.objectOf(PropTypes.any).isRequired
};

export default MaterialField;

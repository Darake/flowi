import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { FormikSelectField } from '../Shared/MaterialFormikFields';

const SelectWithItems = ({
  name,
  label,
  handleChange,
  fieldClassName,
  items,
  ...props
}) => {
  return (
    <FormikSelectField
      name={name}
      label={label}
      formControlClassName={fieldClassName}
      onChange={handleChange}
      {...props}
    >
      {items.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))}
    </FormikSelectField>
  );
};

SelectWithItems.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  fieldClassName: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

SelectWithItems.defaultProps = {
  fieldClassName: undefined
};

export default SelectWithItems;

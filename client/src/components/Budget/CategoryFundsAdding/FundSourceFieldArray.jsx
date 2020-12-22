import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FundSources from './FundSources';

const useStyles = makeStyles(theme => ({
  addSource: {
    marginTop: theme.spacing(1),
    paddingLeft: 0
  }
}));

const FundFieldArray = ({ values, setFieldValue }) => {
  const classes = useStyles();

  return (
    <FieldArray name="fundSources">
      {arrayHelpers => (
        <div>
          <FundSources
            values={values}
            setFieldValue={setFieldValue}
            arrayHelpers={arrayHelpers}
          />
          <Button
            className={classes.addSource}
            size="small"
            color="primary"
            onClick={() => arrayHelpers.push({ object: '', addition: '' })}
            data-cy="add-additional-source-button"
          >
            Add additional source
          </Button>
        </div>
      )}
    </FieldArray>
  );
};

FundFieldArray.propTypes = {
  values: PropTypes.objectOf(PropTypes.any).isRequired,
  setFieldValue: PropTypes.func.isRequired
};

export default FundFieldArray;

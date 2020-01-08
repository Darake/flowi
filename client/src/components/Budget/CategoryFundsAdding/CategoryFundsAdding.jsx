import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { updateCategory } from '../../../reducers/categoryReducer';
import FundFieldArray from './FundSourceFieldArray';

const useStyles = makeStyles(theme => ({
  dialogContent: {
    marginBottom: theme.spacing(4)
  },
  dialogButtons: {
    marginTop: 'auto'
  },
  dialogForm: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  }
}));

const CategoryFundsAdding = ({ handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const category = useSelector(state => state.selectedCategory);

  const categoryById = id => categories.filter(b => b.id === id)[0];

  const handleSubmit = values => {
    handleClose();
    const totalAddition = values.fundSources.reduce((sum, source) => {
      if (source.object === 'Accounts') {
        return sum + Number(source.addition);
      }
      if (source.object !== '') {
        const sourceCategory = categoryById(source.object);
        const updatedSourceCategory = {
          ...sourceCategory,
          balance: Number(sourceCategory.balance) - Number(source.addition)
        };
        dispatch(updateCategory(updatedSourceCategory));
        return sum + Number(source.addition);
      }
      return sum;
    }, 0);
    const updatedCategory = {
      ...category,
      balance: Number(totalAddition) + Number(category.balance)
    };
    dispatch(updateCategory(updatedCategory));
  };

  return (
    <>
      <DialogTitle id="fund-adding">{`Add funds to ${category.name}`}</DialogTitle>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          fundSources: [{ object: '', addition: '' }]
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={classes.dialogForm}>
            <DialogContent className={classes.dialogContent}>
              <DialogContentText>
                Choose one or multiple sources
              </DialogContentText>
              <FundFieldArray values={values} setFieldValue={setFieldValue} />
            </DialogContent>
            <DialogActions className={classes.dialogButtons}>
              <Button size="small" onClick={handleClose}>
                CANCEL
              </Button>
              <Button
                type="submit"
                size="small"
                color="primary"
                className={classes.saveButton}
              >
                SAVE
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </>
  );
};

CategoryFundsAdding.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default CategoryFundsAdding;

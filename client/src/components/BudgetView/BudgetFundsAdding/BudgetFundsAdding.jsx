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
import { updateBudget } from '../../../reducers/budgetReducer';
import FundFieldArray from './FundFieldArray';

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

const BudgetFundsAdding = ({ handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const budgets = useSelector(state => state.budgets);
  const budget = useSelector(state => state.selectedBudget);

  const budgetById = id => budgets.filter(b => b.id === id)[0];

  const handleSubmit = values => {
    handleClose();
    const totalAddition = values.fundSources.reduce((sum, source) => {
      if (source.object === 'Accounts') {
        return sum + Number(source.addition);
      }
      if (source.object !== '') {
        const sourceBudget = budgetById(source.object);
        const updatedSourceBudget = {
          ...sourceBudget,
          balance: Number(sourceBudget.balance) - Number(source.addition)
        };
        dispatch(updateBudget(updatedSourceBudget));
        return sum + Number(source.addition);
      }
      return sum;
    }, 0);
    const updatedBudget = {
      ...budget,
      balance: Number(totalAddition) + Number(budget.balance)
    };
    dispatch(updateBudget(updatedBudget));
  };

  return (
    <>
      <DialogTitle id="fund-adding">{`Add funds to ${budget.name}`}</DialogTitle>
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

BudgetFundsAdding.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default BudgetFundsAdding;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { updateBudget } from '../../reducers/budgetReducer';
import BudgetDeletionDialog from './BudgetDeletionDialog';

const useStyles = makeStyles(theme => ({
  editingDialogContent: {
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));

const BudgetEditing = ({ handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const budget = useSelector(state => state.selectedBudget);
  const [newName, setNewName] = useState(budget.name);

  const onChange = e => {
    setNewName(e.target.value);
  };

  const handleSave = async () => {
    if (newName) {
      const updatedBudget = { ...budget, name: newName };
      await dispatch(updateBudget(updatedBudget));
      handleClose();
    }
  };

  return (
    <>
      <DialogTitle id="category-editing">{`Edit ${budget.name}`}</DialogTitle>
      <DialogContent className={classes.editingDialogContent}>
        <DialogContentText>Enter a new name for the category</DialogContentText>
        <TextField type="text" fullWidth value={newName} onChange={onChange} />
        <BudgetDeletionDialog closeMainDialog={handleClose} />
      </DialogContent>
      <DialogActions>
        <Button size="small" onClick={handleClose}>
          CANCEL
        </Button>
        <Button size="small" color="primary" onClick={handleSave}>
          SAVE
        </Button>
      </DialogActions>
    </>
  );
};

BudgetEditing.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default BudgetEditing;

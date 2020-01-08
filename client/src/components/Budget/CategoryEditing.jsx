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
import { updateCategory } from '../../reducers/categoryReducer';
import CategoryDeletionDialog from './CategoryDeletionDialog';

const useStyles = makeStyles(theme => ({
  editingDialogContent: {
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));

const CategoryEditing = ({ handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const category = useSelector(state => state.selectedCategory);
  const [newName, setNewName] = useState(category.name);

  const onChange = e => {
    setNewName(e.target.value);
  };

  const handleSave = async () => {
    if (newName) {
      const updatedCategory = { ...category, name: newName };
      await dispatch(updateCategory(updatedCategory));
      handleClose();
    }
  };

  return (
    <>
      <DialogTitle id="category-editing">{`Edit ${category.name}`}</DialogTitle>
      <DialogContent className={classes.editingDialogContent}>
        <DialogContentText>Enter a new name for the category</DialogContentText>
        <TextField type="text" fullWidth value={newName} onChange={onChange} />
        <CategoryDeletionDialog closeMainDialog={handleClose} />
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

CategoryEditing.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default CategoryEditing;

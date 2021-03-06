import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createCategory } from '../../reducers/categoryReducer';
import DialogActionButtons from '../Shared/DialogActionButtons';

const CategoryCreationDialog = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (name.length > 0) {
      await dispatch(createCategory({ name, balance: 0 }));
    }
    setName('');
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleClickOpen}
        data-cy="add-category-button"
      >
        ADD CATEGORY
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for the category.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="categoryName"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            data-cy="category-name-field"
          />
        </DialogContent>
        <DialogActionButtons
          handleClose={handleClose}
          handlePrimaryClick={handleSave}
        />
      </Dialog>
    </div>
  );
};

export default CategoryCreationDialog;

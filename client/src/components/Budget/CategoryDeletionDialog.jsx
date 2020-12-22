import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { deleteCategory } from '../../reducers/categoryReducer';
import DialogActionButtons from '../Shared/DialogActionButtons';

const useStyles = makeStyles(theme => ({
  deleteCategoryButton: {
    marginTop: theme.spacing(2),
    paddingLeft: 0
  }
}));

const CategoryDeletionDialog = ({ closeMainDialog }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const category = useSelector(state => state.selectedCategory);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteCategory(category));
    handleClose();
    closeMainDialog();
  };

  return (
    <>
      <Button
        size="small"
        color="primary"
        onClick={handleClickOpen}
        className={classes.deleteCategoryButton}
        data-cy="delete-category-button"
      >
        DELETE CATEGORY
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{`Delete ${category.name}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting a budget permanently deletes it.
          </DialogContentText>
        </DialogContent>
        <DialogActionButtons
          handleClose={handleClose}
          handlePrimaryClick={handleDelete}
          primaryButtonLabel="DELETE"
          primaryButtonColor="secondary"
        />
      </Dialog>
    </>
  );
};

CategoryDeletionDialog.propTypes = {
  closeMainDialog: PropTypes.func.isRequired
};

export default CategoryDeletionDialog;

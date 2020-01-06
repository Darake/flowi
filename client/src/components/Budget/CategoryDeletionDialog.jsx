import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { deleteBudget } from '../../reducers/budgetReducer';

const useStyles = makeStyles(theme => ({
  deleteCategoryButton: {
    marginTop: theme.spacing(2),
    paddingLeft: 0
  }
}));

const CategoryDeletionDialog = ({ closeMainDialog }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const budget = useSelector(state => state.selectedBudget);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteBudget(budget));
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
      >
        DELETE CATEGORY
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{`Delete ${budget.name}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting a budget permanently deletes it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

CategoryDeletionDialog.propTypes = {
  closeMainDialog: PropTypes.func.isRequired
};

export default CategoryDeletionDialog;

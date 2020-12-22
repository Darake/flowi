import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteAccount } from '../../reducers/accountReducer';
import DialogActionButtons from '../Shared/DialogActionButtons';

const AccountDeletionDialog = ({ account }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteAccount(account));
    handleClose();
    history.push('/');
  };

  return (
    <div>
      <Button
        size="small"
        color="secondary"
        onClick={handleClickOpen}
        data-cy="delete-account-button"
      >
        DELETE
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Delete ${account.name}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting an account permanently deletes it.
          </DialogContentText>
        </DialogContent>
        <DialogActionButtons
          handleClose={handleClose}
          handlePrimaryClick={handleDelete}
          primaryButtonLabel="DELETE"
          primaryButtonColor="secondary"
        />
      </Dialog>
    </div>
  );
};

AccountDeletionDialog.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired
  }).isRequired
};

export default AccountDeletionDialog;

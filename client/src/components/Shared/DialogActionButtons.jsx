import React from 'react';
import PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const DialogActionButtons = ({
  handleClose,
  dialogActionClassName,
  handlePrimaryClick,
  primaryButtonLabel = 'SAVE',
  primaryButtonColor = 'primary'
}) => {
  const primaryButtonType = handlePrimaryClick ? 'button' : 'submit';

  return (
    <DialogActions className={dialogActionClassName}>
      <Button onClick={handleClose}>CANCEL</Button>
      <Button
        type={primaryButtonType}
        onClick={handlePrimaryClick}
        color={primaryButtonColor}
      >
        {primaryButtonLabel}
      </Button>
    </DialogActions>
  );
};

DialogActionButtons.propTypes = {
  handleClose: PropTypes.func.isRequired,
  dialogActionClassName: PropTypes.string,
  handlePrimaryClick: PropTypes.func,
  primaryButtonLabel: PropTypes.string,
  primaryButtonColor: PropTypes.string
};

DialogActionButtons.defaultProps = {
  dialogActionClassName: '',
  handlePrimaryClick: null,
  primaryButtonLabel: 'SAVE',
  primaryButtonColor: 'primary'
};

export default DialogActionButtons;

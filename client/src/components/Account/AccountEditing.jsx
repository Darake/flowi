import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { updateAccount } from '../../reducers/accountReducer';
import Balance from '../Shared/Balance';

const useStyles = makeStyles(theme => ({
  nameEdit: {
    paddingBottom: theme.spacing(1)
  }
}));

const AccountEditing = ({ account, setEditing }) => {
  const [newName, setNewName] = useState(account.name);
  const classes = useStyles();
  const dispatch = useDispatch();

  const onChange = event => {
    setNewName(event.target.value);
  };

  const handleSave = async () => {
    if (newName) {
      const updatedAccount = { ...account, name: newName };
      await dispatch(updateAccount(updatedAccount));
      setEditing(false);
    }
  };

  return (
    <div>
      <CardContent>
        <TextField
          type="text"
          value={newName}
          onChange={onChange}
          autoFocus
          className={classes.nameEdit}
        />
        <Balance balance={account.balance} />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" type="button" onClick={handleSave}>
          SAVE
        </Button>
      </CardActions>
    </div>
  );
};

AccountEditing.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired
  }).isRequired,
  setEditing: PropTypes.func.isRequired
};

export default AccountEditing;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { updateAccount, deleteAccount } from '../../reducers/accountReducer';

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(1),
    display: 'flex'
  },
  balance: {
    color: '#38bec9',
    display: 'block'
  },
  nameEdit: {
    paddingBottom: theme.spacing(1)
  }
}));

const Account = ({ account }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(account.name);
  const classes = useStyles();

  const handleSave = async () => {
    if (newName) {
      const updatedAccount = { ...account, name: newName };
      await dispatch(updateAccount(updatedAccount));
      setEditing(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = () => {
    dispatch(deleteAccount(account));
    history.push('/');
  };

  const onChange = event => {
    setNewName(event.target.value);
  };

  return (
    <Card className={classes.card}>
      {editing ? (
        <div>
          <CardContent>
            <TextField
              type="text"
              value={newName}
              onChange={onChange}
              autoFocus
              className={classes.nameEdit}
            />
            <Typography
              component="span"
              variant="body2"
              className={classes.balance}
            >
              {account.balance}
              {user.currency}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              type="button"
              onClick={handleSave}
            >
              SAVE
            </Button>
          </CardActions>
        </div>
      ) : (
        <div>
          <CardContent>
            <Typography component="h1" variant="h6">
              {account.name}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              className={classes.balance}
            >
              {account.balance}
              {user.currency}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" type="button" onClick={() => handleEdit()}>
              Edit name
            </Button>
            <Popup
              trigger={
                <Button size="small" type="button" color="secondary">
                  Delete
                </Button>
              }
              modal
              closeOnDocumentClick
            >
              {close => (
                <div>
                  <span>{`Delete ${account.name}?`}</span>
                  <button type="button" onClick={() => close()}>
                    CANCEL
                  </button>
                  <button type="button" onClick={handleDelete}>
                    DELETE
                  </button>
                </div>
              )}
            </Popup>
          </CardActions>
        </div>
      )}
    </Card>
  );
};

Account.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired
  }).isRequired
};

export default Account;

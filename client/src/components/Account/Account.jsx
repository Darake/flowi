import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { updateAccount, deleteAccount } from '../../reducers/accountReducer';

const Account = ({ id }) => {
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.accounts);
  const account = accounts.find(a => a.id === id);

  const history = useHistory();

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(account.name);

  const handleSave = () => {
    if (newName) {
      const updatedAccount = { ...account, name: newName };
      dispatch(updateAccount(updatedAccount));
    }
    setEditing(false);
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
    <div>
      {editing ? (
        <div>
          <input type="text" value={newName} onChange={onChange} />
          <button type="button" onClick={handleSave}>
            SAVE
          </button>
        </div>
      ) : (
        <h1>{account.name}</h1>
      )}
      {account.balance}
      {editing ? null : (
        <div>
          <button type="button" onClick={() => handleEdit()}>
            Edit name
          </button>
          <Popup
            trigger={<button type="button">Delete</button>}
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
        </div>
      )}
    </div>
  );
};

Account.propTypes = {
  id: PropTypes.string.isRequired
};

export default Account;

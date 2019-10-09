import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { updateAccount, deleteAccount } from '../../reducers/accountReducer';

const Account = ({ account }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(account.name);

  const handleSave = async () => {
    if (newName) {
      const updatedAccount = { ...account, name: newName };
      await dispatch(updateAccount(updatedAccount));
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
    <div>
      {editing ? (
        <div>
          <input type="text" value={newName} onChange={onChange} />
          <button type="button" onClick={handleSave}>
            SAVE
          </button>
        </div>
      ) : (
        <div>
          <h1>{account.name}</h1>
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
      {account.balance}
    </div>
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

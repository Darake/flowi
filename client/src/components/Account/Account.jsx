import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Popup from 'reactjs-popup';
import * as accountActions from '../../reducers/accountReducer';

const Account = ({ account, updateAccount, deleteAccount, history }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(account.name);
  const [newName, setNewName] = useState(name);

  const handleSave = () => {
    if (newName) {
      setName(newName);
      const updatedAccount = { ...account, name };
      updateAccount(updatedAccount);
    }
    setEditing(false);
  };

  const handleDelete = () => {
    deleteAccount(account);
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
        <h1>{name}</h1>
      )}
      {account.balance}
      {editing ? null : (
        <div>
          <button type="button" onClick={() => setEditing(true)}>
            Edit name
          </button>
          <Popup
            trigger={<button type="button">Delete</button>}
            modal
            closeOnDocumentClick
          >
            {close => (
              <div>
                <span>{`Delete ${name}?`}</span>
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
  account: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  updateAccount: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withRouter(
  connect(
    null,
    { ...accountActions }
  )(Account)
);

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Popup from 'reactjs-popup';
import * as accountActions from '../../reducers/accountReducer';

const Account = ({ id, accounts, updateAccount, deleteAccount, history }) => {
  const account = accounts.find(a => a.id === id);

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(account.name);

  const handleSave = async () => {
    if (newName) {
      const updatedAccount = { ...account, name: newName };
      await updateAccount(updatedAccount);
    }
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
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
  id: PropTypes.string.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateAccount: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  accounts: state.accounts
});

const mapDispatchToProps = {
  ...accountActions
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account)
);

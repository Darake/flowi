import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as accountActions from '../../reducers/accountReducer';

const Account = ({ account, updateAccount }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(account.name);

  const handleSave = () => {
    if (name) {
      const updatedAccount = { name, ...account };
      updateAccount(updatedAccount);
    } else {
      setName(account.name);
    }
    setEditing(false);
  };

  const onChange = event => {
    setName(event.target.value);
  };

  return (
    <div>
      {editing ? (
        <div>
          <input type="text" value={name} onChange={onChange} />
          <button type="button" onClick={handleSave}>
            SAVE
          </button>
        </div>
      ) : (
        <h1>{name}</h1>
      )}
      {account.balance}
      <button type="button" onClick={() => setEditing(true)}>
        Edit name
      </button>
      {editing ? null : <button type="button">Delete</button>}
    </div>
  );
};

Account.propTypes = {
  account: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  updateAccount: PropTypes.func.isRequired
};

export default connect(
  null,
  { ...accountActions }
)(Account);

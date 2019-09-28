import React from 'react';
import Popup from 'reactjs-popup';
import AccountList from './AccountList';
import AccountCreation from '../AccountCreation';

const AccountView = () => (
  <div>
    <h2>Accounts</h2>
    <AccountList />
    <Popup
      trigger={<button type="button">Add Account</button>}
      modal
      closeOnDocumentClick
    >
      {close => (
        <div>
          <AccountCreation closeModal={close} />
          <button type="button" onClick={() => close()}>
            CANCEL
          </button>
        </div>
      )}
    </Popup>
  </div>
);

export default AccountView;

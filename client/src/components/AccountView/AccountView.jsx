import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import Account from './Account';
import AccountCreation from '../AccountCreation';

const AccountView = ({ accounts }) => {
  return (
    <div>
      <h2>Accounts</h2>
      <table>
        <tbody>
          {accounts.map(a => (
            <Account key={a.id} name={a.name} balance={a.balance} />
          ))}
        </tbody>
      </table>
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
};

AccountView.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  accounts: state.accounts
});

export default connect(mapStateToProps)(AccountView);

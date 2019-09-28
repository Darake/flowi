import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Account from './Account';

const AccountList = ({ accounts }) => (
  <table>
    <tbody>
      {accounts.map(a => (
        <Account key={a.id} name={a.name} balance={a.balance} />
      ))}
    </tbody>
  </table>
);

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  accounts: state.accounts
});

export default connect(mapStateToProps)(AccountList);

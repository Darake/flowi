import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AccountList = ({ accounts }) => (
  <table>
    <tbody>
      {accounts.map(a => (
        <tr key={a.id}>
          <th>{a.name}</th>
          <th>{a.balance}</th>
        </tr>
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

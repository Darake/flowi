import React from 'react';
import PropTypes from 'prop-types';

const Account = ({ name, balance }) => (
  <tr>
    <th>{name}</th>
    <th>{balance}</th>
  </tr>
);

Account.propTypes = {
  name: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired
};

export default Account;

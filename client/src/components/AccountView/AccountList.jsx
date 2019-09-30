import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const AccountList = ({ accounts, history }) => {
  const onClick = id => {
    history.push(`/accounts/${id}`);
  };

  return (
    <table>
      <tbody>
        {accounts.map(a => (
          <tr key={a.id} onClick={() => onClick(a.id)}>
            <th>{a.name}</th>
            <th>{a.balance}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  accounts: state.accounts
});

export default withRouter(connect(mapStateToProps)(AccountList));

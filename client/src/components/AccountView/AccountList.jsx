import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from '@emotion/styled';

const AccountList = ({ accounts, history }) => {
  const onClick = id => {
    history.push(`/accounts/${id}`);
  };

  const Table = styled.table`
    width: 100%;
  `;

  const BalanceColumn = styled.td`
    text-align: right;
  `;

  return (
    <Table>
      <tbody>
        {accounts.map(a => (
          <tr key={a.id} onClick={() => onClick(a.id)}>
            <td>{a.name}</td>
            <BalanceColumn>{a.balance}</BalanceColumn>
          </tr>
        ))}
      </tbody>
    </Table>
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

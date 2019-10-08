import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from '@emotion/styled';

const AccountList = ({ history, location }) => {
  const accounts = useSelector(state => state.accounts);

  const onClick = id => {
    history.push(`/accounts/${id}`);
  };

  const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
  `;

  return (
    <Table>
      <tbody>
        {accounts.map(a => (
          <ListItem
            id={a.id}
            name={a.name}
            balance={a.balance}
            onClick={onClick}
            pathname={location.pathname}
          />
        ))}
      </tbody>
    </Table>
  );
};

const ListItem = ({ id, name, balance, onClick, pathname }) => {
  const accountPathname = `/accounts/${id}`;

  const Row = styled.tr`
    :hover {
      background-color: #0a558c;
      cursor: pointer;
    }
    background-color: ${accountPathname === pathname ? '#003E6B' : '#0f609b'};
  `;

  const NameCell = styled.td`
    padding: 8px 8px 8px 12px;
  `;

  const BalanceCell = styled.td`
    text-align: right;
    padding-right: 12px;
  `;

  return (
    <Row key={id} onClick={() => onClick(id)}>
      <NameCell>{name}</NameCell>
      <BalanceCell>{balance}</BalanceCell>
    </Row>
  );
};

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired
};

AccountList.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.array).isRequired
};

export default withRouter(AccountList);

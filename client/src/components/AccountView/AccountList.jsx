import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const AccountList = () => {
  const accounts = useSelector(state => state.accounts);

  const history = useHistory();

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
          />
        ))}
      </tbody>
    </Table>
  );
};

const ListItem = ({ id, name, balance, onClick }) => {
  const location = useLocation();

  const accountPathname = `/accounts/${id}`;

  const Row = styled.tr`
    :hover {
      background-color: #0a558c;
      cursor: pointer;
    }
    background-color: ${accountPathname === location.pathname
      ? '#003E6B'
      : '#0f609b'};
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
  onClick: PropTypes.func.isRequired
};

export default AccountList;

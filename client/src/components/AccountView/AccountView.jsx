import React from 'react';
import Popup from 'reactjs-popup';
import styled from '@emotion/styled';
import AccountList from './AccountList';
import AccountCreation from '../AccountCreation';

const StyledAccountView = styled.div`
  margin-bottom: auto;
  color: white;
`;

const Header = styled.h2`
  padding-left: 12px;
  margin-bottom: 8px;
`;

const Button = styled.button`
  border-radius: 8px;
  border: #186faf;
  background-color: #2680c2;
  color: white;
  padding: 4px 12px;
  font-size: 12px;
  margin-top: 12px;
  margin-left: 12px;
`;

const AccountView = () => (
  <StyledAccountView>
    <Header>Accounts</Header>
    <AccountList />
    <Popup
      trigger={<Button type="button">Add Account</Button>}
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
  </StyledAccountView>
);

export default AccountView;

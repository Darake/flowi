import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import AccountView from '../AccountView';
import { logout } from '../../reducers/userReducer';

const DesktopNav = ({ location }) => {
  const dispatch = useDispatch();

  const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    width: 256px;
    background-color: #0f609b;
    @media (max-width: 1223px) {
      display: none;
    }
  `;

  const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  border-bottom 1px solid #0A558C;
  padding: 8px;
  height: 36px;
  :hover {
    background-color: #0A558C;
  }
  background-color: ${location.pathname === '/' ? '#003E6B' : '#0f609b'};
`;

  const LinkText = styled.span`
    font-size: 24px;
    color: white;
    margin: 0 24px;
  `;

  const Logout = styled.button`
    display: flex;
    align-items: center;
    background-color: #0f609b;
    border: 0;
    padding: 0;
    margin: auto 12px 12px 12px;
  `;

  return (
    <Nav>
      <NavLink to="/">
        <img src="/budgetwhitesmall.png" alt="budget" />
        <LinkText>Budget</LinkText>
      </NavLink>
      <AccountView />
      <Logout type="button" onClick={() => dispatch(logout())}>
        <img src="/logoutwhitesmall.png" alt="budget" />
        <LinkText>Log out</LinkText>
      </Logout>
    </Nav>
  );
};

DesktopNav.propTypes = {
  location: PropTypes.objectOf(PropTypes.array).isRequired
};

export default withRouter(DesktopNav);

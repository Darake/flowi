import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/userReducer';

const MobileNav = () => {
  const dispatch = useDispatch();

  const Nav = styled.nav`
    height: 10vh;
    background-color: #0f609b;
    text-align: center;
    display: flex;
    @media (min-width: 1224px) {
      display: none;
    }
  `;

  const IconLink = styled(Link)`
    width: 33.33%;
    width: calc(100% / 3);
    text-align: center;
    padding: 12px 0;
    display flex;
    align-items: center;
    justify-content: center;
  `;

  const IconButton = styled.button`
    text-align: center;
    background-color: #0f609b;
    border: 0;
  `;

  return (
    <Nav>
      <IconLink to="/accounts">
        <picture>
          <source srcSet="/bankwhitebig.png" media="(min-width: 760px)" />
          <img src="/bankwhite.png" alt="accounts" />
        </picture>
      </IconLink>
      <IconLink to="/">
        <picture>
          <source srcSet="/budgetwhitebig.png" media="(min-width: 760px)" />
          <img src="/budgetwhite.png" alt="budget" />
        </picture>
      </IconLink>
      <IconLink to="/">
        <IconButton type="button" onClick={() => dispatch(logout())}>
          <picture>
            <source srcSet="/logoutwhitebig.png" media="(min-width: 760px)" />
            <img src="/logoutwhite.png" alt="logout" />
          </picture>
        </IconButton>
      </IconLink>
    </Nav>
  );
};

export default MobileNav;

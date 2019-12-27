import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GridOn from '@material-ui/icons/GridOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import AccountView from '../AccountView';
import { logout } from '../../reducers/userReducer';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  logout: {
    bottom: 0,
    position: 'fixed',
    width: drawerWidth
  },
  links: {
    paddingTop: 0
  },
  active: {
    backgroundColor: theme.palette.action.selected
  }
}));

const DesktopNav = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();

  const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    width: 256px;
    background-color: #0f609b;
    @media (max-width: 1223px) {
      display: none;
    }
  `;

  /*const NavLink = styled(Link)`
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
`;*/

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
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
    >
      <List className={classes.links}>
        <ListItem
          button
          component={NavLink}
          exact
          to="/"
          activeClassName={classes.active}
        >
          <ListItemIcon>
            <GridOn />
          </ListItemIcon>
          <ListItemText primary="Budget" />
        </ListItem>
      </List>
      <Divider />
      <AccountView />
      <List className={classes.logout}>
        <ListItem button onClick={() => dispatch(logout())}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </Drawer>
  );

  /*return (
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
  );*/
};

export default DesktopNav;

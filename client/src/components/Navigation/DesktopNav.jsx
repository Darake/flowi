import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GridOn from '@material-ui/icons/GridOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Accounts from '../Accounts';
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
    width: drawerWidth,
    backgroundColor: 'white',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    paddingTop: 0,
    paddingBottom: 0
  },
  active: {
    backgroundColor: theme.palette.action.selected
  }
}));

const DesktopNav = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
      data-cy="side-bar"
    >
      <Divider />
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
        <ListItem
          button
          component={NavLink}
          exact
          to="/transactions"
          activeClassName={classes.active}
        >
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItem>
      </List>
      <Divider />
      <Accounts />
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
};

export default DesktopNav;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import GridOn from '@material-ui/icons/GridOn';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../reducers/userReducer';

const useStyles = makeStyles({
  stickToBottom: {
    bottom: 0,
    position: 'fixed',
    width: '100%'
  }
});

const MobileNav = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  if (value === 3) dispatch(logout());

  const classes = useStyles();

  return (
    <BottomNavigation
      value={value}
      onChange={(e, newValue) => setValue(newValue)}
      className={classes.stickToBottom}
    >
      <BottomNavigationAction
        label="Budget"
        icon={<GridOn />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="Transactions"
        icon={<ReceiptIcon />}
        component={Link}
        to="/transactions"
      />
      <BottomNavigationAction
        label="Accounts"
        icon={<AccountBalanceIcon />}
        component={Link}
        to="/accounts"
      />
      <BottomNavigationAction
        label="Log out"
        icon={<ExitToAppIcon />}
        component={Link}
        to="/"
      />
    </BottomNavigation>
  );
};

export default MobileNav;

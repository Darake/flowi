import React from 'react';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import DesktopHeader from './DesktopHeader';
import Header from '../../Shared/Header';

const AccountViewHeader = () => (
  <div>
    <Hidden smUp>
      <Header title="Accounts">
        <Button
          color="primary"
          size="small"
          variant="outlined"
          component={Link}
          to="/new-account"
        >
          ADD ACCOUNT
        </Button>
      </Header>
    </Hidden>
    <Hidden smDown>
      <DesktopHeader />
    </Hidden>
  </div>
);
export default AccountViewHeader;

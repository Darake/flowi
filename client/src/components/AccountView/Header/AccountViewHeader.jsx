import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

const AccountViewHeader = () => (
  <div>
    <Hidden smUp>
      <MobileHeader />
    </Hidden>
    <Hidden smDown>
      <DesktopHeader />
    </Hidden>
  </div>
);
export default AccountViewHeader;

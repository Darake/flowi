import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountDeletion from './AccountDeletion';
import Balance from '../Shared/Balance';

const AccountContent = ({ account, handleEdit }) => (
  <div>
    <CardContent>
      <Typography component="h1" variant="h6">
        {account.name}
      </Typography>
      <Balance balance={account.balance} />
    </CardContent>
    <CardActions>
      <Button size="small" type="button" onClick={() => handleEdit()}>
        Edit name
      </Button>
      <AccountDeletion account={account} />
    </CardActions>
  </div>
);

AccountContent.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired
  }).isRequired,
  handleEdit: PropTypes.func.isRequired
};

export default AccountContent;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AccountEditing from './AccountEditing';
import AccountContent from './AccountContent';

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(1),
    display: 'flex'
  }
}));

const Account = ({ account }) => {
  const [editing, setEditing] = useState(false);
  const classes = useStyles();

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <Card className={classes.card}>
      {editing ? (
        <AccountEditing account={account} setEditing={setEditing} />
      ) : (
        <AccountContent account={account} handleEdit={handleEdit} />
      )}
    </Card>
  );
};

Account.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired
  }).isRequired
};

export default Account;

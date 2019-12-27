import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  balance: {
    color: '#38bec9',
    display: 'block'
  }
});

const AccountBalance = ({ balance }) => {
  const classes = useStyles();
  const user = useSelector(state => state.user);

  return (
    <Typography component="span" variant="body2" className={classes.balance}>
      {balance}
      {user.currency}
    </Typography>
  );
};

AccountBalance.propTypes = {
  balance: PropTypes.number.isRequired
};

export default AccountBalance;

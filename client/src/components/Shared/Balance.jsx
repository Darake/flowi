import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  balance: {
    color: outflow => (outflow ? 'red' : '#38bec9'),
    display: 'block'
  }
});

const Balance = ({ balance, outflow = false }) => {
  const classes = useStyles(outflow);
  const user = useSelector(state => state.user);

  const sign = outflow ? '-' : null;

  return (
    <Typography component="span" variant="body2" className={classes.balance}>
      {sign}
      {balance}
      {user.currency}
    </Typography>
  );
};

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  outflow: PropTypes.bool
};

Balance.defaultProps = {
  outflow: false
};

export default Balance;

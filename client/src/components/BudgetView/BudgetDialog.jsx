import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTheme } from '@material-ui/core/styles';
import BudgetFundsAdding from './BudgetFundsAdding';
import BudgetEditing from './BudgetEditing';
import { resetBudget } from '../../reducers/selectedBudgetReducer';

const BudgetDialog = ({ open, setOpen }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    dispatch(resetBudget());
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="fund-adding"
    >
      <Paper square>
        <Tabs
          value={tab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={handleTabChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Fund adding" />
          <Tab label="Edit category" />
        </Tabs>
      </Paper>
      {tab === 0 ? (
        <BudgetFundsAdding handleClose={handleClose} />
      ) : (
        <BudgetEditing handleClose={handleClose} />
      )}
    </Dialog>
  );
};

BudgetDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default BudgetDialog;

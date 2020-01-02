import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTheme } from '@material-ui/core/styles';
import BudgetFundsAdding from './BudgetFundsAdding';

const BudgetDialog = ({ open, setOpen, budget }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [tab, setTab] = useState(0);

  const budgetName = budget ? budget.name : 'placeholder';

  const handleClose = () => {
    setOpen(false);
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
          <Tab label={`Edit ${budgetName}`} />
        </Tabs>
      </Paper>
      {tab === 0 ? (
        <BudgetFundsAdding setOpen={setOpen} budget={budget} />
      ) : null}
    </Dialog>
  );
};

BudgetDialog.defaultProps = {
  budget: null
};

BudgetDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  budget: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  })
};

export default BudgetDialog;

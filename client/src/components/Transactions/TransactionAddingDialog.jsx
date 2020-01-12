import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import NewOutflowTransaction from './NewOutflowTransaction';
import NewInflowTransaction from './NewInflowTransaction';
import NewTransferTransaction from './NewTransferTransaction';

const tabs = Object.freeze({
  OUTFLOW: 0,
  INFLOW: 1,
  TRANSFER: 2
});

const TransactionAddingDialog = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [tab, setTab] = useState(tabs.OUTFLOW);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTab(tabs.OUTFLOW);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleOpen}
      >
        ADD TRANSACTION
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        fullWidth
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
            <Tab value={tabs.OUTFLOW} label="Outflow" />
            <Tab value={tabs.INFLOW} label="Inflow" />
            <Tab value={tabs.TRANSFER} label="Transfer" />
          </Tabs>
        </Paper>
        <NewOutflowTransaction
          handleClose={handleClose}
          hidden={tab !== tabs.OUTFLOW}
        />
        <NewInflowTransaction
          handleClose={handleClose}
          hidden={tab !== tabs.INFLOW}
        />
        <NewTransferTransaction
          handleClose={handleClose}
          hidden={tab !== tabs.TRANSFER}
        />
      </Dialog>
    </>
  );
};

export default TransactionAddingDialog;

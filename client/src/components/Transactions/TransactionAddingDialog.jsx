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

const TransactionAddingDialog = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTab(0);
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
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <Paper square>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            onChange={handleTabChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Outflow" />
            <Tab label="Inflow" />
          </Tabs>
        </Paper>
        {tab === 0 ? (
          <NewOutflowTransaction handleClose={handleClose} />
        ) : (
          <NewInflowTransaction handleClose={handleClose} />
        )}
      </Dialog>
    </>
  );
};

export default TransactionAddingDialog;

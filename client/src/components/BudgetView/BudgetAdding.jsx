import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, FieldArray, useField } from 'formik';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  fundSource: {
    marginBottom: theme.spacing(1)
  },
  fundSourceName: {
    width: '140px',
    marginRight: theme.spacing(2)
  },
  fundSourceAmount: {
    width: '70px'
  },
  fundTitle: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(1)
  },
  addSource: {
    marginTop: theme.spacing(1),
    paddingLeft: 0
  },
  removeSource: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(1),
    padding: 0,
    verticalAlign: 'bottom'
  }
}));

const FormikTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        label={label}
        helperText={meta.error && meta.touched && meta.error}
        error={meta.error && meta.name}
        {...field}
        {...props}
      />
    </>
  );
};

const FormikSelectField = ({ label, children, ...props }) => {
  return (
    <>
      <FormControl {...props}>
        <InputLabel>{label}</InputLabel>
        <Select {...props}>{children}</Select>
      </FormControl>
    </>
  );
};

const BudgetAdding = ({ open, setOpen, budget }) => {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const budgetNames = useSelector(state => state.budgets).map(b => b.name);
  const { currency } = useSelector(state => state.user);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="fund-adding"
    >
      <DialogTitle id="fund-adding">Add funds to category</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            amount: '',
            fundSources: [{ name: '', balance: '' }]
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <FormikTextField
                label="Amount to be added"
                name="amount"
                type="number"
                fullWidth
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">{currency}</InputAdornment>
                  )
                }}
              />
              <Typography className={classes.fundTitle}>
                Choose one or multiple sources
              </Typography>
              <FieldArray name="fundSources">
                {arrayHelpers => (
                  <div>
                    {values.fundSources.map((source, index) => (
                      <div key={index} className={classes.fundSource}>
                        <FormikSelectField
                          label="Source"
                          name={`fundSources.${index}.name`}
                          className={classes.fundSourceName}
                          value={source.name}
                          onChange={handleChange}
                        >
                          <MenuItem value="Accounts">Accounts</MenuItem>
                          <ListSubheader>Other Budgets</ListSubheader>
                          {budgetNames.map(name => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </FormikSelectField>
                        <FormikTextField
                          type="number"
                          label="Amount"
                          name={`fundSources.${index}.balance`}
                          value={source.balance}
                          className={classes.fundSourceAmount}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {currency}
                              </InputAdornment>
                            )
                          }}
                        />
                        {index > 0 ? (
                          <IconButton
                            aria-label="delete"
                            className={classes.removeSource}
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        ) : null}
                      </div>
                    ))}
                    <Button
                      className={classes.addSource}
                      size="small"
                      color="primary"
                      onClick={() =>
                        arrayHelpers.push({ name: '', balance: '' })
                      }
                    >
                      Add additional source
                    </Button>
                  </div>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

BudgetAdding.defaultProps = {
  budget: null
};

BudgetAdding.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  budget: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  })
};

export default BudgetAdding;

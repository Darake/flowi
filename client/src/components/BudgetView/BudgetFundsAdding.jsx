import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, FieldArray, useField } from 'formik';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Balance from '../Shared/Balance';
import { updateBudget } from '../../reducers/budgetReducer';

const useStyles = makeStyles(theme => ({
  fundSource: {
    marginBottom: theme.spacing(1)
  },
  fundSourceObject: {
    width: '130px',
    marginRight: theme.spacing(2)
  },
  fundSourceAddition: {
    width: '80px',
    verticalAlign: 'bottom'
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
  },
  fundSourceOption: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  dialogContent: {
    marginBottom: theme.spacing(4)
  },
  dialogButtons: {
    marginTop: 'auto'
  },
  dialogForm: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
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

FormikTextField.propTypes = {
  label: PropTypes.string.isRequired
};

const FormikSelectField = ({ label, children, ...props }) => {
  const [field] = useField(props);

  return (
    <>
      <FormControl {...props}>
        <InputLabel>{label}</InputLabel>
        <Select {...field} {...props}>
          {children}
        </Select>
      </FormControl>
    </>
  );
};

FormikSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.any).isRequired
};

const BudgetFundsAdding = ({ open, setOpen, budget }) => {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const budgets = useSelector(state => state.budgets);
  const totalBudgeted = budgets.reduce((sum, b) => sum + b.balance, 0);
  const totalAccountBalance = useSelector(state => state.accounts).reduce(
    (sum, account) => sum + account.balance,
    0
  );
  const accounts = {
    name: 'Accounts',
    balance: totalAccountBalance - totalBudgeted
  };
  const { currency } = useSelector(state => state.user);

  const budgetName = budget ? budget.name : 'placeholder';

  const budgetById = id => budgets.filter(b => b.id === id)[0];

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = values => {
    handleClose();
    const totalAddition = values.fundSources.reduce((sum, source) => {
      if (source.object === 'Accounts') {
        return sum + Number(source.addition);
      }
      if (source.object !== '') {
        const sourceBudget = budgetById(source.object);
        const updatedSourceBudget = {
          ...sourceBudget,
          balance: Number(sourceBudget.balance) - Number(source.addition)
        };
        dispatch(updateBudget(updatedSourceBudget));
        return sum + Number(source.addition);
      }
      return sum;
    }, 0);
    const updatedBudget = {
      ...budget,
      balance: Number(totalAddition) + Number(budget.balance)
    };
    dispatch(updateBudget(updatedBudget));
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="fund-adding"
    >
      <DialogTitle id="fund-adding">{`Add funds to ${budgetName}`}</DialogTitle>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          fundSources: [{ object: '', addition: '' }]
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={classes.dialogForm}>
            <DialogContent className={classes.dialogContent}>
              <DialogContentText>
                Choose one or multiple sources
              </DialogContentText>
              <FieldArray name="fundSources">
                {arrayHelpers => (
                  <div>
                    {values.fundSources.map((source, index) => (
                      <div key={index} className={classes.fundSource}>
                        <FormikSelectField
                          label="Source"
                          name={`fundSources.${index}.object`}
                          className={classes.fundSourceObject}
                        >
                          <MenuItem
                            value={accounts.name}
                            className={classes.fundSourceOption}
                            disabled={values.fundSources
                              .map(s => s.object)
                              .includes('Accounts')}
                          >
                            Accounts
                            {values.fundSources[index].object === '' ? (
                              <Balance
                                balance={accounts.balance}
                                className={classes.balance}
                              />
                            ) : null}
                          </MenuItem>
                          <ListSubheader disabled>Other Budgets</ListSubheader>
                          {budgets
                            .filter(b => b.id !== budget.id)
                            .map(b => (
                              <MenuItem
                                key={b.id}
                                value={b.id}
                                className={classes.fundSourceOption}
                                disabled={values.fundSources
                                  .map(s => s.object)
                                  .includes(b.id)}
                              >
                                {b.name}
                                {values.fundSources[index].object === '' ? (
                                  <Balance
                                    balance={b.balance}
                                    className={classes.balance}
                                  />
                                ) : null}
                              </MenuItem>
                            ))}
                        </FormikSelectField>
                        <FormikTextField
                          type="number"
                          label="Amount"
                          name={`fundSources.${index}.addition`}
                          value={source.addition}
                          className={classes.fundSourceAddition}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {currency}
                              </InputAdornment>
                            )
                          }}
                          disabled={values.fundSources[index].object === ''}
                          onChange={e => {
                            const { balance } =
                              values.fundSources[index].object === 'Accounts'
                                ? accounts
                                : budgetById(values.fundSources[index].object);
                            if (e.target.value > balance) {
                              setFieldValue(
                                `fundSources.${index}.addition`,
                                balance
                              );
                            } else if (e.target.value < 0) {
                              setFieldValue(`fundSources.${index}.addition`, 0);
                            } else {
                              setFieldValue(
                                `fundSources.${index}.addition`,
                                e.target.value
                              );
                            }
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
                        arrayHelpers.push({ object: '', addition: '' })
                      }
                    >
                      Add additional source
                    </Button>
                  </div>
                )}
              </FieldArray>
            </DialogContent>
            <DialogActions className={classes.dialogButtons}>
              <Button size="small" onClick={handleClose}>
                CANCEL
              </Button>
              <Button
                type="submit"
                size="small"
                color="primary"
                className={classes.saveButton}
              >
                SAVE
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

BudgetFundsAdding.defaultProps = {
  budget: null
};

BudgetFundsAdding.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  budget: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  })
};

export default BudgetFundsAdding;

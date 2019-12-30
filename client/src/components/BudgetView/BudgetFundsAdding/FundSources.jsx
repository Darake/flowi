import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Balance from '../../Shared/Balance';
import {
  FormikTextField,
  FormikSelectField
} from '../../Shared/MaterialFormikFields';

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
  }
}));

const FundSources = ({ budget, values, setFieldValue, arrayHelpers }) => {
  const classes = useStyles();
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

  const budgetById = id => budgets.filter(b => b.id === id)[0];

  const sourceAlreadySelected = source =>
    values.fundSources.map(s => s.object).includes(source);

  const sourceNotSelected = index => values.fundSources[index].object === '';

  const moreThanOneSources = index => index > 0;

  const handleAmountChange = (e, index) => {
    const { balance } =
      values.fundSources[index].object === 'Accounts'
        ? accounts
        : budgetById(values.fundSources[index].object);
    if (e.target.value > balance) {
      setFieldValue(`fundSources.${index}.addition`, balance);
    } else if (e.target.value < 0) {
      setFieldValue(`fundSources.${index}.addition`, 0);
    } else {
      setFieldValue(`fundSources.${index}.addition`, e.target.value);
    }
  };

  return (
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
              disabled={sourceAlreadySelected('Accounts')}
            >
              Accounts
              {sourceNotSelected(index) ? (
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
                  disabled={sourceAlreadySelected(b.id)}
                >
                  {b.name}
                  {sourceNotSelected(index) ? (
                    <Balance balance={b.balance} className={classes.balance} />
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
                <InputAdornment position="end">{currency}</InputAdornment>
              )
            }}
            disabled={sourceNotSelected(index)}
            onChange={e => handleAmountChange(e, index)}
          />
          {moreThanOneSources(index) ? (
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
    </div>
  );
};

FundSources.defaultProps = {
  budget: null
};

FundSources.propTypes = {
  budget: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  }),
  values: PropTypes.objectOf(PropTypes.array).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  arrayHelpers: PropTypes.objectOf(PropTypes.any).isRequired
};

export default FundSources;

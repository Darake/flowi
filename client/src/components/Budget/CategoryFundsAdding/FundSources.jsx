import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Balance from '../../Shared/Balance';
import {
  FormikAmountField,
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

const FundSources = ({ values, setFieldValue, arrayHelpers }) => {
  const classes = useStyles();
  const categories = useSelector(state => state.categories);
  const category = useSelector(state => state.selectedCategory);
  const totalBudgeted = categories.reduce((sum, b) => sum + b.balance, 0);
  const totalAccountBalance = useSelector(state => state.accounts).reduce(
    (sum, account) => sum + account.balance,
    0
  );

  const accounts = {
    name: 'Accounts',
    balance: totalAccountBalance - totalBudgeted
  };

  const categoryById = id => categories.filter(b => b.id === id)[0];

  const sourceAlreadySelected = source =>
    values.fundSources.map(s => s.object).includes(source);

  const sourceNotSelected = index => values.fundSources[index].object === '';

  const moreThanOneSources = index => index > 0;

  const handleAmountChange = (e, index) => {
    const { balance } =
      values.fundSources[index].object === 'Accounts'
        ? accounts
        : categoryById(values.fundSources[index].object);
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
            formControlClassName={classes.fundSourceObject}
            data-cy="add-funds-source"
          >
            <MenuItem
              value={accounts.name}
              className={classes.fundSourceOption}
              disabled={sourceAlreadySelected('Accounts')}
              data-cy="source-option-account"
            >
              Accounts
              {sourceNotSelected(index) ? (
                <Balance
                  balance={accounts.balance}
                  className={classes.balance}
                />
              ) : null}
            </MenuItem>
            <ListSubheader value="">Other Budgets</ListSubheader>
            {categories
              .filter(b => b.id !== category.id)
              .map(b => (
                <MenuItem
                  key={b.id}
                  value={b.id}
                  className={classes.fundSourceOption}
                  disabled={sourceAlreadySelected(b.id)}
                  data-cy="source-option"
                >
                  {b.name}
                  {sourceNotSelected(index) ? (
                    <Balance balance={b.balance} className={classes.balance} />
                  ) : null}
                </MenuItem>
              ))}
          </FormikSelectField>
          <FormikAmountField
            label="Amount"
            name={`fundSources.${index}.addition`}
            value={source.addition}
            className={classes.fundSourceAddition}
            disabled={sourceNotSelected(index)}
            onChange={e => handleAmountChange(e, index)}
            data-cy="source-amount"
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

FundSources.propTypes = {
  values: PropTypes.objectOf(PropTypes.any).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  arrayHelpers: PropTypes.objectOf(PropTypes.any).isRequired
};

export default FundSources;

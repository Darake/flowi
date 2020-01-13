import { useResourceReducer } from './resourceReducer';

const [reducer, actionCreators, transactionService] = useResourceReducer(
  'TRANSACTION',
  'TRANSACTIONS'
);

export default reducer;

export const initializeTransactions = actionCreators.initializeResources;

export const clearTransactions = actionCreators.clearResource;

export const updateTransaction = actionCreators.updateResource;

export const deleteTransaction = actionCreators.deleteResource;

export const createOutflowTransaction = (
  sourceAccount,
  targetCategory,
  amount,
  date
) => {
  return async dispatch => {
    const savedTransaction = await transactionService.create({
      sourceAccount: sourceAccount.id,
      targetCategory: targetCategory.id,
      amount,
      date
    });
    dispatch({
      type: 'NEW_TRANSACTION',
      payload: savedTransaction
    });
    dispatch({
      type: 'UPDATE_ACCOUNT',
      payload: { ...sourceAccount, balance: sourceAccount.balance - amount }
    });
    dispatch({
      type: 'UPDATE_CATEGORY',
      payload: { ...targetCategory, balance: targetCategory.balance - amount }
    });
  };
};

export const createInflowTransaction = (targetAccount, amount, date) => {
  return async dispatch => {
    const savedTransaction = await transactionService.create({
      targetAccount: targetAccount.id,
      amount,
      date
    });
    dispatch({
      type: 'NEW_TRANSACTION',
      payload: savedTransaction
    });
    dispatch({
      type: 'UPDATE_ACCOUNT',
      payload: { ...targetAccount, balance: targetAccount.balance + amount }
    });
  };
};

export const createTransfer = (sourceAccount, targetAccount, amount, date) => {
  return async dispatch => {
    const savedTransaction = await transactionService.create({
      sourceAccount: sourceAccount.id,
      targetAccount: targetAccount.id,
      amount,
      date
    });
    dispatch({
      type: 'NEW_TRANSACTION',
      payload: savedTransaction
    });
    dispatch({
      type: 'UPDATE_ACCOUNT',
      payload: { ...sourceAccount, balance: sourceAccount.balance - amount }
    });
    dispatch({
      type: 'UPDATE_ACCOUNT',
      payload: { ...targetAccount, balance: targetAccount.balance + amount }
    });
  };
};

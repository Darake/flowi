import { useResourceService } from '../services/resources';

const accountService = useResourceService('/api/accounts');

export const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'INITIALIZE_ACCOUNTS':
      return payload;
    case 'CLEAR_ACCOUNTS':
      return initialState;
    case 'NEW_ACCOUNT':
      return [...state, payload];
    case 'UPDATE_ACCOUNT':
      return state.map(account =>
        account.id === payload.id ? payload : account
      );
    case 'DELETE_ACCOUNT':
      return state.filter(account => account.id !== payload.id);

    default:
      return state;
  }
};

export const initializeAccounts = () => {
  return async dispatch => {
    const accounts = await accountService.getAll();
    dispatch({
      type: 'INITIALIZE_ACCOUNTS',
      payload: accounts
    });
  };
};

export const clearAccounts = () => {
  return {
    type: 'CLEAR_ACCOUNTS'
  };
};

export const createAccount = (name, balance) => {
  return async dispatch => {
    const savedAccount = await accountService.create({ name, balance });
    dispatch({
      type: 'NEW_ACCOUNT',
      payload: savedAccount
    });
  };
};

export const updateAccount = account => {
  return async dispatch => {
    const updatedAccount = await accountService.update(account);
    dispatch({
      type: 'UPDATE_ACCOUNT',
      payload: updatedAccount
    });
  };
};

export const deleteAccount = account => {
  return async dispatch => {
    await accountService.remove(account.id);
    dispatch({
      type: 'DELETE_ACCOUNT',
      payload: account
    });
  };
};

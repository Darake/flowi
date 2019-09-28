import accountService from '../services/accounts';

export const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'INITIALIZE_ACCOUNTS':
      return payload;
    case 'NEW_ACCOUNT':
      return [...state, payload];

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

export const createAccount = (name, balance) => {
  return async dispatch => {
    const savedAccount = await accountService.create({ name, balance });
    dispatch({
      type: 'NEW_ACCOUNT',
      payload: savedAccount
    });
  };
};

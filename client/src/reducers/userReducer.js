import authService from '../services/auth';
import accountService from '../services/accounts';

export const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_USER':
      return payload;

    default:
      return state;
  }
};

export const checkUser = () => {
  return async dispatch => {
    const loggedUser = window.localStorage.getItem('loggedFlowiUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      accountService.setToken(user.token);
      dispatch({
        type: 'SET_USER',
        payload: user
      });
    }
  };
};

export const logout = () => {
  window.localStorage.clear();
  accountService.setToken(null);
  return {
    type: 'SET_USER',
    payload: null
  };
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      const user = await authService.login({ email, password });
      accountService.setToken(user.token);
      window.localStorage.setItem('loggedFlowiUser', JSON.stringify(user));
      dispatch({
        type: 'SET_USER',
        payload: user
      });
      return null;
    } catch (exception) {
      return exception;
    }
  };
};

export const register = (email, password, currency) => {
  return async () => {
    try {
      const user = { email, password, currency };
      await authService.register(user);
      return null;
    } catch (exception) {
      return exception;
    }
  };
};

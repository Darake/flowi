import authService from '../services/auth';
import { setToken } from '../services/token';
import { setNotification } from './notificationReducer';
import { clearAccounts } from './accountReducer';
import { clearCategories } from './categoryReducer';

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
      setToken(user.token);
      dispatch({
        type: 'SET_USER',
        payload: user
      });
    }
  };
};

export const logout = () => {
  return async dispatch => {
    window.localStorage.clear();
    setToken(null);
    dispatch(clearCategories());
    dispatch(clearAccounts());
    dispatch({
      type: 'SET_USER',
      payload: null
    });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      const user = await authService.login({ email, password });
      window.localStorage.setItem('loggedFlowiUser', JSON.stringify(user));
      setToken(user.token);
      dispatch({
        type: 'SET_USER',
        payload: user
      });
    } catch (exception) {
      dispatch(setNotification('Incorrect email or password'));
    }
  };
};

export const register = (email, password, currency) => {
  return async dispatch => {
    try {
      const user = { email, password, currency };
      await authService.register(user);
      await dispatch(login(email, password));
    } catch (exception) {
      dispatch(
        setNotification(
          'There was an error signing up. The email address might already be taken.'
        )
      );
    }
  };
};

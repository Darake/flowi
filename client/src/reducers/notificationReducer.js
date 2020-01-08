import { useSetResetReducer } from './singleValueReducer';

export default useSetResetReducer('NOTIFICATION');

export const setNotification = message => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: message
    });
    setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      });
    }, 5000);
  };
};

const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_NOTIFICATION':
      return payload;
    case 'NULL_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export const setNotification = message => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: message
    });
    setTimeout(() => {
      dispatch({
        type: 'NULL_NOTIFICATION'
      });
    }, 5000);
  };
};

export const initialState = { name: 'Placeholder' };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_CATEGORY':
      return payload;
    case 'RESET_CATEGORY':
      return initialState;
    default:
      return state;
  }
};

export const setCategory = category => {
  return {
    type: 'SET_CATEGORY',
    payload: category
  };
};

export const resetCategory = () => {
  return {
    type: 'RESET_CATEGORY'
  };
};

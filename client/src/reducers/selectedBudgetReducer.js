export const initialState = { name: 'Placeholder' };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_BUDGET':
      return payload;
    case 'RESET_BUDGET':
      return initialState;
    default:
      return state;
  }
};

export const setBudget = budget => {
  return {
    type: 'SET_BUDGET',
    payload: budget
  };
};

export const resetBudget = () => {
  return {
    type: 'RESET_BUDGET'
  };
};

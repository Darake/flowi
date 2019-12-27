import budgetService from '../services/budgets';

export const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'INITIALIZE_BUDGETS':
      return payload;
    case 'NEW_BUDGET':
      return [...state, payload];
    case 'UPDATE_BUDGET':
      return state.map(budget => (budget.id === payload.id ? payload : budget));
    case 'DELETE_BUDGET':
      return state.filter(budget => budget.id !== payload.id);

    default:
      return state;
  }
};

export const initializeBudgets = () => {
  return async dispatch => {
    const budgets = await budgetService.getAll();
    dispatch({
      type: 'INITIALIZE_BUDGETS',
      payload: budgets
    });
  };
};

export const createBudget = (name, balance) => {
  return async dispatch => {
    const savedBudget = await budgetService.create({ name, balance });
    dispatch({
      type: 'NEW_BUDGET',
      payload: savedBudget
    });
  };
};

export const updateBudget = budget => {
  return async dispatch => {
    const updatedBudget = await budgetService.update(budget);
    dispatch({
      type: 'UPDATE_BUDGET',
      payload: updatedBudget
    });
  };
};

export const deleteBudget = budget => {
  return async dispatch => {
    await budgetService.remove(budget.id);
    dispatch({
      type: 'DELETE_BUDGET',
      payload: budget
    });
  };
};

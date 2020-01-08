import categoryService from '../services/categories';

export const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'INITIALIZE_CATEGORIES':
      return payload;
    case 'NEW_CATEGORY':
      return [...state, payload];
    case 'UPDATE_CATEGORY':
      return state.map(category =>
        category.id === payload.id ? payload : category
      );
    case 'DELETE_CATEGORY':
      return state.filter(category => category.id !== payload.id);

    default:
      return state;
  }
};

export const initializeCategories = () => {
  return async dispatch => {
    const categories = await categoryService.getAll();
    dispatch({
      type: 'INITIALIZE_CATEGORIES',
      payload: categories
    });
  };
};

export const createCategory = (name, balance) => {
  return async dispatch => {
    const savedCategory = await categoryService.create({ name, balance });
    dispatch({
      type: 'NEW_CATEGORY',
      payload: savedCategory
    });
  };
};

export const updateCategory = category => {
  return async dispatch => {
    const updatedCategory = await categoryService.update(category);
    dispatch({
      type: 'UPDATE_CATEGORY',
      payload: updatedCategory
    });
  };
};

export const deleteCategory = category => {
  return async dispatch => {
    await categoryService.remove(category.id);
    dispatch({
      type: 'DELETE_CATEGORY',
      payload: category
    });
  };
};

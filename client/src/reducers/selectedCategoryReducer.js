import { useSetResetReducer } from './singleValueReducer';

export default useSetResetReducer('CATEGORY', { name: 'Placeholder' });

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

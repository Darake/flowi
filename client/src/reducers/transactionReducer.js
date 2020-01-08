import { useResourceReducer } from './resourceReducer';

const [reducer, actionCreators] = useResourceReducer(
  'TRANSACTION',
  'TRANSACTIONS'
);

export default reducer;

export const initializeTransactions = actionCreators.initializeResources;

export const clearTransactions = actionCreators.clearResource;

export const createTransaction = actionCreators.createResource;

export const updateTransaction = actionCreators.updateResource;

export const deleteTransaction = actionCreators.deleteResource;

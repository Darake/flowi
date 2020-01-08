import { useResourceReducer } from './resourceReducer';

const [reducer, actionCreators] = useResourceReducer('ACCOUNT', 'ACCOUNTS');

export default reducer;

export const initializeAccounts = actionCreators.initializeResources;

export const clearAccounts = actionCreators.clearResource;

export const createAccount = actionCreators.createResource;

export const updateAccount = actionCreators.updateResource;

export const deleteAccount = actionCreators.deleteResource;

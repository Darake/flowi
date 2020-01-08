import { useResourceReducer } from './resourceReducer';

const [reducer, actionCreators] = useResourceReducer('CATEGORY', 'CATEGORIES');

export default reducer;

export const initializeCategories = actionCreators.initializeResources;

export const clearCategories = actionCreators.clearResource;

export const createCategory = actionCreators.createResource;

export const updateCategory = actionCreators.updateResource;

export const deleteCategory = actionCreators.deleteResource;

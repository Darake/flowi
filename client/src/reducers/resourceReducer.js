import { useResourceService } from '../services/resources';

export const useResourceReducer = (name, pluralName) => {
  const resourceService = useResourceService(`/api/${pluralName}`);

  const initialState = null;

  const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case `INITIALIZE_${pluralName}`:
        return payload;
      case `CLEAR_${pluralName}`:
        return initialState;
      case `NEW_${name}`:
        return [...state, payload];
      case `UPDATE_${name}`:
        return state.map(resource =>
          resource.id === payload.id ? payload : resource
        );
      case `DELETE_${name}`:
        return state.filter(resource => resource.id !== payload.id);

      default:
        return state;
    }
  };

  const initializeResources = () => {
    return async dispatch => {
      const resource = await resourceService.getAll();
      dispatch({
        type: `INITIALIZE_${pluralName}`,
        payload: resource
      });
    };
  };

  const clearResource = () => {
    return {
      type: `CLEAR_${pluralName}`
    };
  };

  const createResource = resource => {
    return async dispatch => {
      const savedResource = await resourceService.create(resource);
      dispatch({
        type: `NEW_${name}`,
        payload: savedResource
      });
    };
  };

  const updateResource = resource => {
    return async dispatch => {
      const updatedResource = await resourceService.update(resource);
      dispatch({
        type: `UPDATE_${name}`,
        payload: updatedResource
      });
    };
  };

  const deleteResource = resource => {
    return async dispatch => {
      await resourceService.remove(resource.id);
      dispatch({
        type: `DELETE_${name}`,
        payload: resource
      });
    };
  };

  const actionCreators = {
    initializeResources,
    clearResource,
    createResource,
    updateResource,
    deleteResource
  };

  return [reducer, actionCreators];
};

export default { useResourceReducer };

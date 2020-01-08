export const useSetResetReducer = (name, initialState = null) => {
  return (state = initialState, { type, payload }) => {
    switch (type) {
      case `SET_${name}`:
        return payload;
      case `RESET_${name}`:
        return initialState;
      default:
        return state;
    }
  };
};

export default { useSetResetReducer };

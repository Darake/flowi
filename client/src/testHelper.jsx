import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import userReducer from './reducers/userReducer';
import accountReducer from './reducers/accountReducer';

export const renderWithRedux = (initialState, ui) => {
  const reducer = combineReducers({
    user: userReducer,
    accounts: accountReducer
  });
  const store = createStore(reducer, initialState, applyMiddleware(thunk));
  return render(<Provider store={store}>{ui}</Provider>);
};

export const initialState = { user: null, accounts: [] };

export default { renderWithRedux };

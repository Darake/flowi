import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import accountReducer from './reducers/accountReducer';

const reducer = combineReducers({
  user: userReducer,
  accounts: accountReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

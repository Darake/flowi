import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import accountReducer from './reducers/accountReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  user: userReducer,
  accounts: accountReducer,
  notification: notificationReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

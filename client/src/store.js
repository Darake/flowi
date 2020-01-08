import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import accountReducer from './reducers/accountReducer';
import notificationReducer from './reducers/notificationReducer';
import categoryReducer from './reducers/categoryReducer';
import selectedCategoryReducer from './reducers/selectedCategoryReducer';
import transactionReducer from './reducers/transactionReducer';

const reducer = combineReducers({
  user: userReducer,
  accounts: accountReducer,
  categories: categoryReducer,
  transactions: transactionReducer,
  notification: notificationReducer,
  selectedCategory: selectedCategoryReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

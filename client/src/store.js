import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import accountReducer from './reducers/accountReducer';
import notificationReducer from './reducers/notificationReducer';
import budgetReducer from './reducers/budgetReducer';
import selectedBudgetReducer from './reducers/selectedBudgetReducer';

const reducer = combineReducers({
  user: userReducer,
  accounts: accountReducer,
  budgets: budgetReducer,
  notification: notificationReducer,
  selectedBudget: selectedBudgetReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

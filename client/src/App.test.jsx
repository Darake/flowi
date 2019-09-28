import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  render,
  fireEvent,
  waitForElement,
  wait
} from '@testing-library/react';
import App from './App';
import userReducer from './reducers/userReducer';
import accountReducer from './reducers/accountReducer';

let container;
let getByText;
let getByPlaceholderText;

const initialState = { user: null, accounts: [] };
const reducer = combineReducers({
  user: userReducer,
  accounts: accountReducer
});
const renderWithRedux = (
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return { ...render(<Provider store={store}>{ui}</Provider>), store };
};

describe('when not logged in', () => {
  beforeEach(() => {
    window.localStorage.clear();

    //const initialState = { user: null, accounts: [] };
    //const reducer = combineReducers({
    //  user: userReducer,
    //  accounts: accountReducer
    //});
    //const store = createStore(reducer, initialState, applyMiddleware(thunk));

    ({ container, getByText, getByPlaceholderText } = renderWithRedux(
      //<Provider store={store}>
      <App />
      //</Provider>
    ));
  });

  test('renders auhtentication screen', () => {
    expect(getByText('LOG IN')).toBeDefined();
  });

  test('logs user in with right credentials', async () => {
    const email = getByPlaceholderText('Email');
    const password = getByPlaceholderText('Password');

    fireEvent.change(email, { target: { value: 'admin@example.com' } });
    fireEvent.change(password, { target: { value: 'admin1' } });
    fireEvent.click(getByText('LOG IN'));

    await wait(() => {
      expect(getByText('LOG OUT')).toBeDefined();
    });
  });

  test('logging in with wrong credentials returns an error', async () => {
    const email = getByPlaceholderText('Email');
    const password = getByPlaceholderText('Password');

    fireEvent.change(email, { target: { value: 'wrong@example.com' } });
    fireEvent.change(password, { target: { value: 'admin1' } });
    fireEvent.click(getByText('LOG IN'));

    await wait(() =>
      expect(container).toHaveTextContent('Incorrect email or password')
    );
  });

  test('clicking sign up brings up register form', async () => {
    fireEvent.click(getByText('SIGN UP'));

    await wait(() => expect(container).toHaveTextContent('CONFIRM'));
  });

  describe('after clicking sign up', () => {
    beforeEach(async () => {
      fireEvent.click(getByText('SIGN UP'));
      await waitForElement(() => getByText('CONFIRM'));
    });

    test('clicking `already an user?` brings log in page back up', async () => {
      fireEvent.click(getByText('Already an user?'));

      await waitForElement(() => expect(container).toHaveTextContent('LOG IN'));
    });

    test('signing up with without email returns an error', async () => {
      const password = getByPlaceholderText('Password');
      fireEvent.change(password, { target: { value: 'admin1' } });
      fireEvent.click(getByText('CONFIRM'));

      expect(container).toHaveTextContent('Email address required');
    });

    test('signing up with invalid email format returns an error', async () => {
      const email = getByPlaceholderText('Email');
      const password = getByPlaceholderText('Password');

      fireEvent.change(password, { target: { value: 'admin1' } });
      fireEvent.change(email, { target: { value: 'invalidEmail' } });
      fireEvent.click(getByText('CONFIRM'));

      expect(container).toHaveTextContent('Invalid email format');
    });

    test('signing up without password returns an error', async () => {
      const email = getByPlaceholderText('Email');

      fireEvent.change(email, { target: { value: 'admin@example.com' } });
      fireEvent.click(getByText('CONFIRM'));

      expect(container).toHaveTextContent('Password required');
    });

    test('signing up with a too short password returns an error', async () => {
      const email = getByPlaceholderText('Email');
      const password = getByPlaceholderText('Password');

      fireEvent.change(password, { target: { value: 'admin' } });
      fireEvent.change(email, { target: { value: 'test@test.com' } });

      fireEvent.click(getByText('CONFIRM'));

      expect(container).toHaveTextContent('Password has to be atleast 6 long');
    });

    test('signing up with valid info creates an user', async () => {
      const email = getByPlaceholderText('Email');
      const password = getByPlaceholderText('Password');

      fireEvent.change(email, { target: { value: 'new@example.com' } });
      fireEvent.change(password, { target: { value: 'password' } });

      fireEvent.click(getByText('CONFIRM'));

      await waitForElement(() =>
        expect(container).toHaveTextContent('LOG OUT')
      );
    });
  });
});

describe('when logged in', () => {
  beforeEach(async () => {
    window.localStorage.setItem('loggedFlowiUser', JSON.stringify('token'));

    ({ container, getByText } = renderWithRedux(
      //<Provider store={store}>
      <App />
      //</Provider>
    ));
  });

  test('log out logs user out', async () => {
    await waitForElement(() => fireEvent.click(getByText('LOG OUT')));

    await waitForElement(() => expect(container).toHaveTextContent('LOG IN'));
  });

  test('an account creation page pops up if no accounts created', async () => {
    expect(container).toHaveTextContent('LOG IN');
  });
});

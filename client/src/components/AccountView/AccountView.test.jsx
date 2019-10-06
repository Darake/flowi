import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderWithRedux } from '../../testHelper';
import AccountView from './AccountView';

let container;
let getByText;
let getByLabelText;

describe('<AccountView />', () => {
  beforeEach(() => {
    const initialState = {
      user: null,
      accounts: [
        {
          name: 'Nordea',
          balance: '1337',
          id: 1
        },
        {
          name: 'Danske',
          balance: '9001',
          id: 2
        }
      ]
    };
    const history = createMemoryHistory();

    ({ container, getByText, getByLabelText } = renderWithRedux(
      initialState,
      <Router history={history}>
        <AccountView />
      </Router>
    ));
  });

  test('renders everything', () => {
    expect(container).toHaveTextContent('Accounts');
    expect(container).toHaveTextContent('Nordea');
    expect(container).toHaveTextContent('Danske');
    expect(container).toHaveTextContent('1337');
    expect(container).toHaveTextContent('9001');
  });

  test('does not show modal by default', () => {
    expect(container).not.toHaveTextContent('Account creation');
    expect(container).not.toHaveTextContent('DELETE');
  });

  describe('when Add Account is clicked', () => {
    beforeEach(() => {
      fireEvent.click(getByText('Add Account'));
    });

    test('shows AccountCreation', () => {
      expect(container).toHaveTextContent('Account creation');
      expect(container).toHaveTextContent('Account name');
      expect(container).toHaveTextContent('Starting balance');
      expect(container).toHaveTextContent('CONFIRM');
      expect(container).toHaveTextContent('CANCEL');
    });

    test('closes modal when CANCEL is clicked', () => {
      fireEvent.click(getByText('CANCEL'));

      expect(container).not.toHaveTextContent('Account creation');
    });

    test('closes modal when successfully adding an account', async () => {
      const name = getByLabelText('Account name');
      const balance = getByLabelText('Starting balance');

      fireEvent.change(name, { target: { value: 'OP' } });
      fireEvent.change(balance, { target: { value: 12 } });
      fireEvent.click(getByText('CONFIRM'));

      await wait(() => {
        expect(container).not.toHaveTextContent('Account creation');
      });
    });
  });
});

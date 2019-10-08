import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderWithRedux } from '../../testHelper';
import Account from './Account';

let container;
let getByText;
let getByDisplayValue;

const account = {
  id: '1',
  name: 'Nordea',
  balance: 9001
};

beforeEach(() => {
  const initialState = {
    user: null,
    accounts: [account]
  };
  const history = createMemoryHistory();

  ({ container, getByText, getByDisplayValue } = renderWithRedux(
    initialState,
    <Router history={history}>
      <Account id="1" />
    </Router>
  ));
});

describe('<Account />', () => {
  test('renders', () => {
    expect(container).toHaveTextContent(account.name);
    expect(container).toHaveTextContent(account.balance);
    expect(container).toHaveTextContent('Edit name');
    expect(container).toHaveTextContent('Delete');
  });

  describe('clicking Edit name', () => {
    beforeEach(() => {
      fireEvent.click(getByText('Edit name'));
    });

    test('changes name to input field', () => {
      expect(getByDisplayValue(account.name)).toBeDefined();
    });

    test('shows save button', () => {
      expect(getByText('SAVE')).toBeDefined();
    });

    test('hides Delete button', () => {
      expect(container).not.toHaveTextContent('Delete');
    });

    test('clicking save exits editing mode', () => {
      fireEvent.click(getByText('SAVE'));

      expect(container).toHaveTextContent(account.name);
      expect(container).toHaveTextContent('Delete');
    });

    test('changing name and clicking Save changes account name', async () => {
      fireEvent.change(getByDisplayValue(account.name), {
        target: { value: 'Danske' }
      });
      fireEvent.click(getByText('SAVE'));

      await wait(() => {
        expect(container).toHaveTextContent('Danske');
      });
    });

    test('changing name to nothing and clicking Save doesnt change name', () => {
      fireEvent.change(getByDisplayValue(account.name), {
        target: { value: '' }
      });
      fireEvent.click(getByText('SAVE'));

      expect(container).toHaveTextContent('Nordea');
    });
  });

  describe('clicking Delete', () => {
    beforeEach(() => {
      fireEvent.click(getByText('Delete'));
    });

    test('opens a confirmation window', () => {
      expect(container).toHaveTextContent(`Delete ${account.name}?`);
      expect(container).toHaveTextContent('CANCEL');
      expect(container).toHaveTextContent('DELETE');
    });

    describe('and CANCEL', () => {
      beforeEach(() => {
        fireEvent.click(getByText('CANCEL'));
      });

      test('doesnt delete the account', () => {
        expect(container).toHaveTextContent(account.name);
      });

      test('closes the confirmation window', async () => {
        expect(container).not.toHaveTextContent(`Delete ${account.name}?`);
        expect(container).not.toHaveTextContent('CANCEL');
        expect(container).not.toHaveTextContent('DELETE');
      });
    });
  });
});

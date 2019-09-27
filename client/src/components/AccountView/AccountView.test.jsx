import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import AccountView from './AccountView';

const mockAccounts = [
  {
    name: 'Nordea',
    balance: 1337,
    id: 1
  },
  {
    name: 'Danske',
    balance: 9001,
    id: 2
  }
];
const mockSetAccount = jest.fn();

let container;
let getByText;
let getByLabelText;

describe('<AccountView />', () => {
  beforeEach(() => {
    ({ container, getByText, getByLabelText } = render(
      <AccountView accounts={mockAccounts} setAccounts={mockSetAccount} />
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

  test('shows AccountCreation modal when Add Account is clicked', () => {
    fireEvent.click(getByText('Add Account'));

    expect(container).toHaveTextContent('Account creation');
    expect(container).toHaveTextContent('Account name:');
    expect(container).toHaveTextContent('Starting balance:');
    expect(container).toHaveTextContent('CONFIRM');
    expect(container).toHaveTextContent('CANCEL');
  });

  describe('when Add Account is clicked', () => {
    beforeEach(() => {
      fireEvent.click(getByText('Add Account'));
    });

    test('shows AccountCreation modal', () => {
      expect(container).toHaveTextContent('Account creation');
      expect(container).toHaveTextContent('Account name:');
      expect(container).toHaveTextContent('Starting balance:');
      expect(container).toHaveTextContent('CONFIRM');
      expect(container).toHaveTextContent('CANCEL');
    });

    test('closes modal when CANCEL is clicked', () => {
      fireEvent.click(getByText('CANCEL'));

      expect(container).not.toHaveTextContent('Account creation');
    });

    test('closes modal when successfully adding an account', async () => {
      const name = getByLabelText('Account name:');
      const balance = getByLabelText('Starting balance:');

      fireEvent.change(name, { target: { value: 'OP' } });
      fireEvent.change(balance, { target: { value: 0 } });
      fireEvent.click(getByText('CONFIRM'));

      await wait(() => {
        expect(container).not.toHaveTextContent('Account creation');
      });
    });
  });

  describe('when an account is clicked', () => {
    beforeEach(() => {
      fireEvent.click(getByText('Danske'));
    });

    test('shows detailed account modal', () => {
      expect(container).toHaveTextContent('DELETE');
    });
  });
});

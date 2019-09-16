import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import AccountCreation from './AccountCreation';

const mockAccounts = [];
const mockSetAccounts = jest.fn();

let getByLabelText;
let getByText;
let container;

describe('<AccountCreation />', () => {
  beforeEach(() => {
    ({ getByLabelText, getByText, container } = render(
      <AccountCreation accounts={mockAccounts} setAccounts={mockSetAccounts} />
    ));
  });

  test('renders everything', () => {
    expect(container).toHaveTextContent('Account name:');
    expect(container).toHaveTextContent('Starting balance:');
    expect(container).toHaveTextContent('Account creation');
    expect(container).toHaveTextContent('CONFIRM');
  });

  test('account creation without name shows an error', async () => {
    const balance = getByLabelText('Starting balance:');

    fireEvent.change(balance, { target: { value: '9001' } });

    fireEvent.click(getByText('CONFIRM'));

    await wait(() => {
      expect(container).toHaveTextContent('Account name required');
    });
  });

  test('account creation with a non-string balance returns an error', async () => {
    const name = getByLabelText('Account name:');
    const balance = getByLabelText('Starting balance:');

    fireEvent.change(name, { target: { value: 'Nordea' } });
    fireEvent.change(balance, { target: { value: 'notANumber' } });

    fireEvent.click(getByText('CONFIRM'));

    await wait(() => {
      expect(container).toHaveTextContent(
        'Starting balance needs to be a number'
      );
    });
  });

  test('account creation without a starting balance shows and error', async () => {
    const name = getByLabelText('Account name:');

    fireEvent.change(name, { target: { value: 'Nordea' } });

    fireEvent.click(getByText('CONFIRM'));

    await wait(() => {
      expect(container).toHaveTextContent('Starting balance required');
    });
  });
});

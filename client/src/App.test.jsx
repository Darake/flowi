import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import App from './App';

let component;

describe('when not logged in', () => {
  beforeEach(() => {
    component = render(<App />);
  });

  test('renders welcome screen', () => {
    expect(component.getByText('LOG IN')).toBeDefined();
  });

  test('logs user in with right credentials', async () => {
    const { getByLabelText, getByText } = component;

    const email = getByLabelText('Email');
    const password = getByLabelText('Password');

    fireEvent.change(email, { target: { value: 'admin@example.com' } });
    fireEvent.change(password, { target: { value: 'admin' } });
    fireEvent.click(getByText('LOG IN'));

    await waitForElement(() => getByText('LOG OUT'));
  });
});

describe('when logged in', () => {
  beforeEach(async () => {
    window.localStorage.setItem('loggedFlowiUser', JSON.stringify('token'));
    component = render(<App />);
  });

  test('user stays logged in', async () => {
    await waitForElement(() => component.getByText('LOG OUT'));
  });

  test('log out logs user out', async () => {
    const { getByText } = component;

    await waitForElement(() => getByText('LOG OUT'));
    fireEvent.click(getByText('LOG OUT'));
    await waitForElement(() => getByText('LOG IN'));
  });
});

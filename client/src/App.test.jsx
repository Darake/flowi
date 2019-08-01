import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import App from './App';

let component;

describe('when not logged in', () => {
  beforeEach(() => {
    window.localStorage.clear();
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

  test('clicking sign up brings up register form', async () => {
    const { getByText } = component;

    fireEvent.click(getByText('SIGN UP'));

    await waitForElement(() => getByText('CONFIRM'));
  });

  describe('after clicking sign up', () => {
    beforeEach(async () => {
      const { getByText } = component;
      fireEvent.click(getByText('SIGN UP'));
      await waitForElement(() => getByText('CONFIRM'));
    });

    test('clicking `already an user?` brings log in page back up', async () => {
      fireEvent.click(component.getByText('Already an user?'));
      await waitForElement(() => component.getByText('LOG IN'));
    });

    test('signing up with without email returns an alert', async () => {
      const password = component.getByLabelText('Password');
      fireEvent.change(password, { target: { value: 'admin' } });
      fireEvent.click(component.getByText('CONFIRM'));
      await waitForElement(() => component.container.querySelector('.email'));
      const errorMessage = component.container.querySelector('.email');
      console.log(errorMessage);
      expect(component.getByText('Please fill out')).toBeDefined();
    });
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

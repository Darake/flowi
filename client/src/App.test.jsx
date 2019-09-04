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
    const { getByPlaceholderText, getByText } = component;

    const email = getByPlaceholderText('Email');
    const password = getByPlaceholderText('Password');

    fireEvent.change(email, { target: { value: 'admin@example.com' } });
    fireEvent.change(password, { target: { value: 'admin1' } });
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

    test('signing up with without email returns an error', async () => {
      const password = component.getByPlaceholderText('Password');
      fireEvent.change(password, { target: { value: 'admin1' } });
      fireEvent.click(component.getByText('CONFIRM'));
      expect(component.findByText('Email address required')).toBeDefined();
    });

    test('signing up with invalid email format returns an error', async () => {
      const email = component.getByPlaceholderText('Email');
      const password = component.getByPlaceholderText('Password');

      fireEvent.change(password, { target: { value: 'admin1' } });
      fireEvent.change(email, { target: { value: 'invalidEmail' } });

      fireEvent.click(component.getByText('CONFIRM'));

      await waitForElement(() => component.getByText('Invalid email format'));
    });

    test('signing up without password returns an error', async () => {
      const email = component.getByPlaceholderText('Email');

      fireEvent.change(email, { target: { value: 'admin@example.com' } });

      fireEvent.click(component.getByText('CONFIRM'));
      await waitForElement(() => component.getByText('Password required'));
    });

    test('signing up with a too short password returns an error', async () => {
      const email = component.getByPlaceholderText('Email');
      const password = component.getByPlaceholderText('Password');

      fireEvent.change(password, { target: { value: 'admin' } });
      fireEvent.change(email, { target: { value: 'test@test.com' } });

      fireEvent.click(component.getByText('CONFIRM'));

      await waitForElement(() =>
        component.getByText('Password has to be atleast 6 long')
      );
    });

    test('signing up with valid info creates an user', async () => {
      const email = component.getByPlaceholderText('Email');
      const password = component.getByPlaceholderText('Password');

      fireEvent.change(email, { target: { value: 'new@example.com' } });
      fireEvent.change(password, { target: { value: 'password' } });

      fireEvent.click(component.getByText('CONFIRM'));

      await waitForElement(() => component.getByText('LOG OUT'));
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

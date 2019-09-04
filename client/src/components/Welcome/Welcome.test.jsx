import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import Welcome from './Welcome';

test('logging in with wrong credentials returns an error', async () => {
  const setUser = jest.fn();
  const setNewUser = jest.fn();
  const newUser = false;

  const { getByText, getByPlaceholderText } = render(
    <Welcome setUser={setUser} setNewUser={setNewUser} newUser={newUser} />
  );

  const email = getByPlaceholderText('Email');
  const password = getByPlaceholderText('Password');

  fireEvent.change(email, { target: { value: 'wrong@example.com' } });
  fireEvent.change(password, { target: { value: 'admin1' } });
  fireEvent.click(getByText('LOG IN'));

  await waitForElement(() => getByText('Incorrect email or password'));
});

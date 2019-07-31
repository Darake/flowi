import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import Welcome from './Welcome';

test('logging in with wrong credentials returns an error', async () => {
  const setUser = jest.fn();
  const { getByText, getByLabelText } = render(<Welcome setUser={setUser} />);

  const email = getByLabelText('Email');
  const password = getByLabelText('Password');

  fireEvent.change(email, { target: { value: 'wrong@example.com' } });
  fireEvent.change(password, { target: { value: 'admin' } });
  fireEvent.click(getByText('LOG IN'));

  await waitForElement(() => getByText('Incorrect email or password'));
});

/* eslint-disable import/no-extraneous-dependencies */
/* eslint no-console: 0 */
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/react/cleanup-after-each';

jest.mock('./services/auth');

let savedItems = {};

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item;
  },
  getItem: key => savedItems[key],
  clear: () => {
    savedItems = {};
  }
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

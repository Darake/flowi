let accounts = [];

const setToken = () => {};

const create = newAccount => {
  const account = { id: 3, ...newAccount };
  accounts = accounts.concat(account);
  return account;
};

const getAll = () => {
  return Promise.resolve(accounts);
};

export default { setToken, create, getAll };

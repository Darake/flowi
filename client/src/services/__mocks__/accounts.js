let accounts = [];

const setToken = () => {};

const getAll = () => {
  return Promise.resolve(accounts);
};

const create = newAccount => {
  const account = { id: 3, ...newAccount };
  accounts = accounts.concat(account);
  return account;
};

const update = updatedAccount => {
  return updatedAccount;
};

export default { setToken, create, getAll, update };

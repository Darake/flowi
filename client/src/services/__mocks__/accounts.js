let accounts = [];

const setToken = () => {};

const create = newAccount => {
  accounts = accounts.concat(newAccount);
  return newAccount;
};

const getAll = () => {
  return Promise.resolve(accounts);
};

export default { setToken, create, getAll };

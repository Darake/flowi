let accounts = [];

const setToken = () => {};

const create = newAccount => {
  accounts = accounts.concat(newAccount);
  return newAccount;
};

export default { setToken, create };

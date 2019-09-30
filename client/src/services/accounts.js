import axios from 'axios';

const baseUrl = '/api/accounts';

let token = null;

const getConfig = () => ({
  headers: { Authorization: token }
});

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

const create = async newAccount => {
  const response = await axios.post(baseUrl, newAccount, getConfig());
  return response.data;
};

const update = async updatedAccount => {
  const response = await axios.put(
    `${baseUrl}/${updatedAccount.id}`,
    updatedAccount,
    getConfig()
  );
  return response.data;
};

export default { setToken, getAll, create, update };

import axios from 'axios';

const baseUrl = '/api/transactions';

let token = null;

const getConfig = () => ({
  headers: { Authorization: token }
});

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const create = async newTransaction => {
  const response = await axios.post(baseUrl, newTransaction, getConfig());
  return response.data;
};

export default { setToken, create };

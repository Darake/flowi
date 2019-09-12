import axios from 'axios';

const baseUrl = '/api/accounts';

let token = null;

const getConfig = () => ({
  headers: { Authorization: token }
});

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

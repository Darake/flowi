import axios from 'axios';

const baseUrl = '/api/categories';

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

const create = async newCategory => {
  const response = await axios.post(baseUrl, newCategory, getConfig());
  return response.data;
};

const update = async updatedCategory => {
  const response = await axios.put(
    `${baseUrl}/${updatedCategory.id}`,
    updatedCategory,
    getConfig()
  );
  return response.data;
};

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

export default { setToken, getAll, create, update, remove };

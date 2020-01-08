import axios from 'axios';
import { getConfig } from './token';

export const useResourceService = baseUrl => {
  const getAll = async () => {
    const response = await axios.get(baseUrl, getConfig());
    return response.data;
  };

  const create = async newResource => {
    const response = await axios.post(baseUrl, newResource, getConfig());
    return response.data;
  };

  const update = async updatedResource => {
    const response = await axios.put(
      `${baseUrl}/${updatedResource.id}`,
      updatedResource,
      getConfig()
    );
    return response.data;
  };

  const remove = async id => {
    const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
    return response.data;
  };

  return { getAll, create, update, remove };
};

export default useResourceService;

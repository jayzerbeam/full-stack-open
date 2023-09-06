import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (data) => {
  return axios.post(baseUrl, data);
};

const updateNumber = (id, data) => {
  return axios.patch(`${baseUrl}/${id}`, data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, updateNumber, remove };

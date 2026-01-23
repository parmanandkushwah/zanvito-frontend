import api from "./axios";

export const getServiceById = async (id) => {
  const res = await api.get(`/services/${id}`);
  return res.data;
};

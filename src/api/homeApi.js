import api from "./axios";

export const getHomeData = async () => {
  const res = await api.get("/customer/dashboard");
  return res.data;
};

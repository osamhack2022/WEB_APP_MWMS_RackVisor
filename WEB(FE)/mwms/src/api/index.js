import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "https://rackvisor.duckdns.org/api",
});

export const axiosGet = async (targetApiUrl) => {
  const { data } = await axiosInstance.get(targetApiUrl);
  return data;
};

export const axiosPost = async (targetApiUrl, body) => {
  const { data } = await axiosInstance.post(targetApiUrl, body);
  return data;
};

export const axiosPut = async (targetApiUrl, body) => {
  const { data } = await axiosInstance.put(targetApiUrl, body);
  return data;
};

export const axiosDel = async (targetApiUrl, body) => {
  const { data } = await axiosInstance.delete(targetApiUrl, { data: body });
  return data;
};

import axios from "axios";

const baseUrl = "http://211.37.150.202/api";

export const axiosGet = async (targetApiUrl) => {
  const { data } = await axios.get(baseUrl + targetApiUrl);
  return data;
};

export const axiosPost = async (targetApiUrl) => {
  const { data } = await axios.post(baseUrl + targetApiUrl);
  return data;
};

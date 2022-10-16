import axios from "axios";

const baseUrl = "http://211.37.150.202:3003/api";

export const axiosGet = async (targetApiUrl) => {
  const { data } = await axios.get(baseUrl + targetApiUrl);
  return data;
};

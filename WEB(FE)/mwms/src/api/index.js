import axios from "axios";

const baseUrl = "http://211.37.150.202:80/api";
// const baseUrl = "https://cors-anywhere.herokuapp.com/http://211.37.150.202/api";

export const axiosGet = async (targetApiUrl) => {
  const { data } = await axios.get(baseUrl + targetApiUrl);
  return data;
};

export const axiosPost = async (targetApiUrl, body) => {
  const { data } = await axios.post(baseUrl + targetApiUrl, body);
  return data;
};

export const axiosPut = async (targetApiUrl, body) => {
  const { data } = await axios.put(baseUrl + targetApiUrl, body);
  return data;
};

export const axiosDel = async (targetApiUrl, body) => {
  const { data } = await axios.delete(baseUrl + targetApiUrl, { data : body });
  return data;
}
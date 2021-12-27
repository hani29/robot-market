import axios from "axios";

const apiUrl = "http://localhost:8000";
const url = "/api/robots";

export const GetAPI = async () => {
  return axios
    .get(`${apiUrl}${url}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};
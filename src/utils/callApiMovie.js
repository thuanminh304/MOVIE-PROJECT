const { default: axios } = require("axios");
const { BASE_URL } = require("settings/apiConfig");

const callApiMovie = (endpoints, method = "GET", data = null) => {
  return axios({
    url: `${BASE_URL}/${endpoints}`,
    method,
    data,
  });
};
export default callApiMovie;

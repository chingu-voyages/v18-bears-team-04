const axios = require("axios");
const app = require("../../app");

module.exports = async function httpSetup() {
  const listener = app.listen();
  const port = listener.address().port;
  const baseURL = `http://localhost:${port}/api`;
  axios.defaults.baseURL = baseURL;
  return listener;
};

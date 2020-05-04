const dbSetup = require("./db-setup");

module.exports = async function () {
  await dbSetup();
};

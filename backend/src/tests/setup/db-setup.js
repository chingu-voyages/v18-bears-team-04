const { MongoMemoryServer } = require("mongodb-memory-server");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const globalConfigPath = path.join(__dirname, "globalConfig.json");

const mongod = new MongoMemoryServer({
  autoStart: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

module.exports = async function dbSetup() {
  if (!mongod.isRunning) {
    await mongod.start();
  }

  const mongoConfig = {
    mongoDBName: "jest",
    mongoUri: await mongod.getConnectionString(),
  };

  await mongoose.connect(mongoConfig.mongoUri);

  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));

  global.__MONGOD__ = mongod;
};

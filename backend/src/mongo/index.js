const mongoose = require("mongoose");
const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const url = process.env.DB_URL;

const mongoURL = `mongodb://${user}:${password}@${url}?retryWrites=true&w=majority`;

const mongoMsg = (msg) => console.log(`DB Connection ${msg}`);
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

function mongoManager() {
  mongoose
    .connect(mongoURL, mongoOptions)
    .then(() => mongoMsg("established"))
    .catch((err) => mongoMsg(`failed - (${err})`));

  mongoose.connection.on("error", (err) => mongoMsg(`severed - (${err})`));
}

export default mongoManager;

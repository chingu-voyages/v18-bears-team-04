import cors from "cors";
import express from "express";
import createError from "http-errors";
import morganBody from "morgan-body";
import api from "./api";
import mongoManager from "./mongo";
import trimmer from "./helper";
import fileUpload from "express-fileupload";

const app = express();

//ENVIRONMENT VARIABLES GO HERE
const NODE_ENV = process.env.NODE_ENV;

// BEAUTIFIES REQUEST AND RESPONSE BODIES
if (NODE_ENV === "development" || NODE_ENV === "test:withLogs") {
  morganBody(app, { theme: "darkened", dateTimeFormat: "utc" });
}

//Connect To the Database
mongoManager();

// EXPRESS MIDDLEWARES

//Enable File Upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(
  cors({
    origin:
      NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://productionUrlHere.now.sh",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(trimmer);
app.use(express.static("public/uploads"));
// use all routes exported from the routes folder
app.use("/api", api);

// used to catch any routes not found
app.use((req, _, next) => {
  next(createError(404, `Invalid route: ${req.url}`));
});

//Global Error Handler
//Access by passing err with the next callback i.e. next(err)
const GlobalErrorHandler = ({ status, message }, _req, res, _next) => {
  res.status(status || 400).json({ message });
};

app.use(GlobalErrorHandler);

module.exports = app;

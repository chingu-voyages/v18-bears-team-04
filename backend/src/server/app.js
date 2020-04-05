import cors from "cors";
import express from "express";
import createError from "http-errors";
import morganBody from "morgan-body";
import api from "../api";

const app = express();

//ENVIRONMENT VARIABLES GO HERE
const NODE_ENV = process.env.NODE_ENV;

// BEAUTIFIES REQUEST AND RESPONSE BODIES
if (NODE_ENV === "development" || NODE_ENV === "test:withLogs") {
  morganBody(app, { theme: "darkened", dateTimeFormat: "utc" });
}

// EXPRESS MIDDLEWARES
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

export default app;

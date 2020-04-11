import cors from "cors";
import express from "express";
import createError from "http-errors";
import morganBody from "morgan-body";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import trimmer from './helpers/trimmer';
// import api from "./api";
import mongoManager from "./mongo";
import router from './controllers/users'


const app = express();
const port = process.env.PORT || 3000;

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
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
//trimmer middleware
app.use(trimmer);

// parse application/json
app.use(bodyParser.json())

mongoManager();

//User environment variables
dotenv.config();

//set a base URl for the application
const baseUrl = '/api/v1'

// use all routes exported from the routes folder
// app.use("/api", api);
//Index Route ---/api
//Get Welcome Message
app.get('/', (req, res) => {
  res.send('Welcome v18-bears-team-04');
});

//Routers
app.use(`${baseUrl}`, router);

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

app.listen(port, ()=>{
console.log(`Application is running on Port ${port}`)
})
module.exports = app;

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes';
import trimmer from './helpers/trimmer';

const app = express();
const port = process.env.PORT || 6000;

// Json Body Middleware
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//tim middleware
app.use(trimmer);

// Cors Middleware
app.use(cors());

//Base Url
const baseUrl = '/api/v1';

const db = require('./config/database.config').mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database connected successfully ${db}`);
  })
  .catch((err) => {
    console.log(`Unable to connect with the database ${err}`);
  });

dotenv.config();
//Get Welcome Message
app.get('/', (req, res) => {
  res.send('Welcome v18-bears-team-04');
});

//Routers
app.use(`${baseUrl}`, router);

// Get all invalid routes
app.all('*', (req, res) => {
  res.status(404).json({
    error: 'This route does not exist yet!',
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on Port ${port}`);
});

export default app;

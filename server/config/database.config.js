// require('dotenv').config();
import dotenv from 'dotenv';

dotenv.config();

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: process.env.mongoURI,
    secret: process.env.secret,
  };
} else {
  module.exports = require('../../development.json');
}

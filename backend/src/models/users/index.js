// import User from "./model";
// export default User;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["teacher", "student"],
    default: "student",
  },
});

module.exports = mongoose.model('users', userSchema);
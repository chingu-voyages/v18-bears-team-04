const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
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

const User = mongoose.model("User", userSchema);
export default User;

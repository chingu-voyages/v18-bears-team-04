const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["teacher", "student"],
    default: "student",
  },
});

export default userSchema;

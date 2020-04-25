const mongoose = require("mongoose");
const Schema = mongoose.Schema;
export const userRole = {
  TEACHER: "teacher",
  STUDENT: "student",
};

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    enum: [userRole.TEACHER, userRole.STUDENT],
    default: userRole.STUDENT,
  },
  userProfileLink: {
    type: String,
  },
  classIds: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Class",
    },
  ],
  // assignmentIds: [
  //   {
  //     type: mongoose.Types.ObjectId,
  //     ref: "Assignment",
  //   },
  // ],
});

const User = mongoose.model("User", userSchema);
export default User;

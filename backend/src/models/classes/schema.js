const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  className: {
    type: String,
    required: true,
  },
  // classCode: {
  //   type: String,
  //   required: true,
  //   unique: [true, "Class Code is already in Use."], //TODO: Display Custom Message
  // },
  teacherName: {
    type: String,
    required: true,
  },
  studentNames: [
    {
      type: String,
    },
  ],
});

const Class = mongoose.model("Class", classSchema);
export default Class;

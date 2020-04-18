const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  className: {
    type: String,
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
  studentNames: [
    {
      type: String,
      ref: "User",
    },
  ],
});

const Class = mongoose.model("Class", classSchema);
export default Class;

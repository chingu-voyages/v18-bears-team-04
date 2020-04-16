const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gradesSchema = new Schema({
  classId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  grade: {
    type: String,
    enum: ["A", "B", "C", "D", "E", "F"],
    default: null,
  },
});

const Grades = mongoose.model("Grades", gradesSchema);
export default Grades;

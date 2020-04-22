import mongoose from "mongoose";
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  assignmentResults: {
    type: String,
    enum: ["A", "B", "C", "D", "E", "F"],
  },
  studentFeedback: {
    type: String,
    default: null,
  },
  teacherFeedback: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
  },
  startDate: {
    type: Date,
    default: null,
  },
  dueDate: {
    type: Date,
    default: null,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Date,
    default: null,
  },
  teacherDocLink: [
    {
      type: String,
    },
  ],
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;

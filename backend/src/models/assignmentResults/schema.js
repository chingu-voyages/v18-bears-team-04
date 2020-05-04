import mongoose from "mongoose";
const Schema = mongoose.Schema;
export const status = {
  NOT_SUBMITTED: "NOT SUBMITTED",
  SUBMITTED: "SUBMITTED",
  GRADED: "GRADED",
};

export const assignmentResultsSchema = new Schema({
  studentId: {
    type: String,
    ref: "Student",
    //required: true,
    //unique: true,
  },

  status: {
    type: String,
    enum: [status.NOT_SUBMITTED, status.SUBMITTED, status.GRADED],
    default: status.NOT_SUBMITTED,
  },

  grade: {
    type: Number,
    min: 0,
    max: 100,
  },
  studentDocLink: [
    {
      type: String,
    },
  ],
  studentAnswers: {
    type: String,
  },
  submittedOnDate: {
    type: Date,
  },
  studentFeedback: {
    type: String,
  },
  teacherFeedback: {
    type: String,
  },
});

const AssignmentResults = mongoose.model(
  "AssignmentResults",
  assignmentResultsSchema
);
export default AssignmentResults;

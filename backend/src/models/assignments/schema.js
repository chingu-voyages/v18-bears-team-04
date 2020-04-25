import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { assignmentResultsSchema } from "../assignmentResults";

//delete mongoose.connection.models["Assignment"];

const assignmentSchema = new Schema({
  classId: {
    type: String,
    ref: "Class",
    required: true,
  },

  assignmentResults: [assignmentResultsSchema],

  title: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  teacherDocLink: [
    {
      type: String,
    },
  ],
});
// let Assignment;
// try {,
//   Assignment = mongoose.model("Assignment");
// } catch (error) {
//   Assignment = mongoose.model("Assignment", assignmentSchema);
// }

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;

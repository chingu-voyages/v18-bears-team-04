import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
      title: {
          type: String,
          required: true,
         
      },
      description:{
          type: String,
          required: true,
      },
      startDate: {
          type: Date,
          default: null
      },
      endDate: {
          type: Date,
          default: null
      }
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;


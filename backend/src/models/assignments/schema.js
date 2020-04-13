import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    classId: {
        type: String,
        required: true
    },
      title: {
          type: String,
          required: true,
          validate: async (value) => {
            try {
                const result = await Assignment.findOne({ title: value })
                if (result) throw new Error("duplicity detected: title :" + value);
            } catch (error) {
                throw new Error(error);
            }
        }
      },
      description:{
          type: String,
          required: true
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


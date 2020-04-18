const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
  username: [
    {
      type: mongoose.Schema.Types.String,
      ref: "User",
    },
  ],
  assignmentId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
  ],
  message: {
    type: String,
    required: true,
  },
  is_seen: {
    type: Boolean,
    default: false,
  },
});

const Notifications = mongoose.model("Notifications", notificationsSchema);
export default Notifications;

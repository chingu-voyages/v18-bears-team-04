import User from '../models/users';
import Assignment from '../models/assignments';
import { pusher } from '../config/pusher';
import Notifications from '../models/notifications'

/**
 *
 * @param {*} assignemntId
 * @param {*} userId
 * @param {*} message
 * @returns {*} save notification
 */
const saveNewNotification = async (assignmentId, username, message) => {
    try {
      const savedNotification = await Notifications.create({
        username,
        assignmentId,
        message,
      });
      return savedNotification;
    } catch (err) {
      return err ;
    }
  };
const sendStudentsNotification = async (
    username,
    assignmentId,
    title
) =>{
    const user = await User.findOne(username);
   const templateMessage = `<p> Your assignment " <i>${title}</i> " has been created.</p>`;
   saveNewNotification(assignmentId, user, templateMessage);
     // in-app notification
   pusher.trigger(`notification-student-assignment-${username}`, 'new-Assignment', {
    message: `Your have a new ${assignmentId}`,
  });
}

const notifications = {
    sendStudentsNotification
}
export default notifications;
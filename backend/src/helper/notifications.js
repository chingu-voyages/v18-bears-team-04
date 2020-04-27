import sendEmail from  '../config/emails';
import template from './template';
import User, { userRole } from '../models/users';
import Assignment from '../models/assignments';
import { pusher } from '../config/pusher';
import Notifications from '../models/notifications';

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

  /**
 *
 * @param {*} email
 * @param {*} link
 * @param {*} name
 * @returns {*} sends an email to a new user
 */
  const signupEmail = (email, link, name) => {
    const title = 'Welcome to iScholars';
    const body = `<p>Dear ${name},</p>
    <p>We are thrilled to have you.</p>
    <p>At iScholars, we know how much you love to learn. We are her to make it easy and fun.</p>`;
    const message = template(title, body, email);
    sendEmail(email, title, message);
  };

const sendStudentsNotification = async (
  assignmentId,
  title,
  userId
) => {
  const studentEmails = await User.find().lean();
  studentEmails.forEach(user => {
    if(user.role === 'student'){
      let templateSubject = 'New Notification has been created';
      let templateFollowersEmail = user.email;
      let templateMessage = `
        <p>${
          user.email
        } You have a new assignment in <br> <b>${userId}</b></p>`;
  
      const message = template(
        templateSubject,
        templateMessage,
        templateFollowersEmail
      );
      sendEmail(templateFollowersEmail, templateSubject, message);
      saveNewNotification(assignmentId, userId, templateMessage);
  console.log(title, 'userId')
      // in-app notification
      pusher.trigger(`notification-assignment-${title}`, 'new-assignment', {
        message: `${
          user.email
        } You have a new assignment in ${userId}`,
      });
    }  
  });
};

const sendTeachersNotification = async (
  assignmentId,
  title,
  userId
) => {
  const studentEmails = await User.find().lean();
  studentEmails.forEach(user => {
    if(user.role === 'teacher'){
      let templateSubject = 'A student has submitted an assignment';
      let templateFollowersEmail = user.email;
      let templateMessage = `
        <p>${
          user.email
        } You have a new assignment by <br> <b>${userId}</b> to be grade. Kindly look into it</p>`;
  
      const message = template(
        templateSubject,
        templateMessage,
        templateFollowersEmail
      );
      sendEmail(templateFollowersEmail, templateSubject, message);
      saveNewNotification(assignmentId, userId, templateMessage);
      // in-app notification
      pusher.trigger(`notification-assignment-submission-${title}`, 'submitted-assignment', {
        message: `${
          user.email
        } You have an assignment by ${userId} to grade. Kindly look into it.`,
      });
    }  
  });
};
const notifications = {
    sendStudentsNotification,
    signupEmail,
    sendTeachersNotification
}
export default notifications;
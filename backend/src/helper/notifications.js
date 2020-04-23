import sendEmail from  '../config/emails';
import template from './template';
import User, { userRole } from '../models/users';
import Assignment from '../models/assignments';
import { pusher } from '../config/pusher';
import Notifications from '../models/notifications';
import createError from 'http-errors';

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
    <p>At iScholars, we know how much you love to learn. We are her to make it easy and fun.</p>
        <a href="${link}" class="button">Confirm email</a>`;
    const message = template(title, body, email);
    sendEmail(email, title, message);
  };

const sendStudentsNotification = async (
  assignmentId,
  title,
  mailList
) => {
  const studentEmails = await User.find().lean();
  var mailList = [];
  studentEmails.forEach(function(users){
    if(users.role === 'student')
                mailList.push(users.email);
                return mailList;
            });
            
  if (!mailList) throw createError(404, `Students not found`);
  

  //Email notification
  const templateSubject = 'New notification from iScholars';
  const templateEmail = mailList;
  const templateMessage = `<p> ${
    mailList
  }, your have a new assignement with class Id " <i>${title}</i> ".</p>`;

  const message = template(templateSubject, templateMessage, templateEmail);
  sendEmail(templateEmail, templateSubject, message);
  saveNewNotification(assignmentId, mailList, templateMessage);

  // in-app notification
  pusher.trigger(`notification-assignment-${studentNames}`, 'new-assignment', {
    message: `You have a new assignment with class Id ${title}`,
  });
};

const notifications = {
    sendStudentsNotification,
    signupEmail
}
export default notifications;
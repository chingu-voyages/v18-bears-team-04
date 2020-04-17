import Notifications from '../../models/notifications';
/**
 * @description Get a specific notification and update Icon.
 * @param {*} req
 * @param {*} res
 * @returns {object} user provides their assignmentId as params
 */
export const updateIsSeenColumn = async (req, res, next) => {
    try {
      const { assignmentId } = req.params;
      const notification = await Notifications.findOne({assignmentId});
      if (!notification) {
        return res.status(200).json({
          message: 'No notification found for this assignment',
        });
      }
      notification.is_seen = true;
      const response = await notification.save();
      return res.status(200).json({
        userId: notification.userId,
        assignmentId: notification.assignmentId,
        message: notification.message,
        status: response.is_seen,
      });
    } catch (err) {
      next(err);
    }
  };


/**
 * @description Get all Notification users have not read
 * @param {*} req
 * @param {*} res
 * @returns {object} All the notification belonging to the user
 */
export const getAllNotifications = async (req, res, next) => {
    try {
      const notifications = await Notifications.find().lean();
      if (!notifications || notifications.count === 0) {
        return res.status(200).json({
          message: "You don't have any notifications",
        });
      }
      return res.status(200).json({
        data: notifications,
      });
    } catch (err) {
      next(err);
    }
  };
  
export const deleteNotifications = async(req, res,  next)=>{
    try {
        await Notifications.deleteMany({});
        res.status(200).json({
            msg: 'Deleted all Notifications'
        })
    } catch (err) {
    next(err)
    }
    
}

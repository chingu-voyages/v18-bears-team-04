import Class from "../../models/classes";
import createError from "http-errors";
import User, { userRole } from "../../models/users";

export const createClass = async (req, res, next) => {
  try {
    const { teacherName } = req.body;
    //Check if Teacher Exists in the User Table
    const user = await User.findOne({ userName: teacherName });
    if (!user) throw createError(404, `Teacher (${teacherName}) not Found`);

    //Check if User is a Teacher
    if (user.role != userRole.TEACHER)
      throw createError(404, `User (${teacherName}) is not a Teacher`);

    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (err) {
    next(err);
  }
};

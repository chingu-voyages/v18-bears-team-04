import Class from "../../models/classes";
import createError from "http-errors";
import User, { userRole } from "../../models/users";

export const getAllClasses = async (_req, res, next) => {
  try {
    const classes = await Class.find().lean();
    res.status(200).json(classes);
  } catch (err) {
    next(err);
  }
};

// export const getClassFromCode = async (req, res, next) => {
//   try {
//     const { classCode } = req.params;
//     const existingClass = await Class.findOne({ classCode });
//     if (!existingClass)
//       throw createError(404, `Class with Code (${classCode}) not found`);
//     res.status(200).json(existingClass);
//   } catch (err) {
//     next(err);
//   }
// };

export const getClassFromId = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const existingClass = await Class.findById(classId);
    if (!existingClass)
      throw createError(404, `Class with Id (${classId}) not found`);
    res.status(200).json(existingClass);
  } catch (err) {
    next(err);
  }
};

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

export const addStudentToClass = async (req, res, next) => {
  try {
    const { studentName } = req.params;
    const { classId } = req.body;

    //Check if Class Exists
    const existingClass = await Class.findOne({ classCode });
    if (!existingClass)
      throw createError(404, `Class (${existingClass}) not Found`);

    //Check if Student Exists in the User Table
    const user = await User.findOne({ userName: studentName });
    if (!user) throw createError(404, `Student (${studentName}) not Found`);

    //Check if User is a Student
    if (user.role != userRole.STUDENT)
      throw createError(404, `User ${studentName} is not a Student`);

    // Class.findByIdAndUpdate(
    //   //   { classCode },
    //   existingClass._id,
    //   { $push: { studentNames: studentName } }
    // );

    existingClass.studentNames.push(studentName);
    await existingClass.save();

    res.status(201).json(existingClass);
  } catch (err) {
    next(err);
  }
};

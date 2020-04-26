import Class from "../../models/classes";
import Assignment from "../../models/assignments";
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

export const getClassesByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) throw createError(404, `User with id (${userId}) not Found`);

    const classIds = user.classIds;

    //TODO: Use Populate method instead
    const classArray = await Promise.all(
      classIds.map(async (classId) => {
        try {
          const cl = await Class.findById(classId);
          return cl;
        } catch (err) {
          next(err);
        }
      })
    );

    res.status(200).json(classArray);
  } catch (err) {
    next(err);
  }
};

export const getAllAssignmentsForClass = async (req, res, next) => {
  try {
    const { classId } = req.params;
    //validate if class exists
    const existingClass = await Class.findById(classId);
    if (!existingClass)
      throw createError(404, `Class with id ${classId} dose not exist`);

    const assignments = await Assignment.find({ classId: classId });

    res.status(200).json(assignments);
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

    //Add ClassId to User Table's Class Id's Array
    const classId = newClass._id;
    user.classIds.push(classId);
    await user.save();

    res.status(201).json({
      msg: "New class Created",
      newClass,
    });
  } catch (err) {
    next(err);
  }
};

export const addStudentToClass = async (req, res, next) => {
  try {
    const { studentId } = req.query;
    const { classId } = req.query;

    //Check if Class Exists
    const existingClass = await Class.findById(classId);
    if (!existingClass)
      throw createError(404, `Class with id (${classId}) not Found`);

    //Add ClassId to User Table's Class Ids Array
    const updatedStudent = await User.findOneAndUpdate(
      { _id: studentId, role: userRole.STUDENT },
      { $addToSet: { classIds: classId } },
      { new: true }
    );

    if (!updatedStudent)
      throw createError(404, `Student with id (${studentId}) not Found`);

    //Add StudentId to Class Table's studentIds Array
    const updatedClass = await Class.findOneAndUpdate(
      { _id: classId },
      { $addToSet: { studentIds: studentId } },
      { new: true }
    );

    res.status(200).json({
      msg: "Student sucessfully added to Class",
      updatedStudent,
      updatedClass,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteStudentFromClass = async (req, res, next) => {
  try {
    const { studentId } = req.query;
    const { classId } = req.query;

    //Check if Class Exists
    const existingClass = await Class.findById(classId);
    if (!existingClass)
      throw createError(404, `Class with id (${classId}) not Found`);

    //Delete ClassId From User Table's Class Ids Array
    const updatedStudent = await User.findOneAndUpdate(
      { _id: studentId, role: userRole.STUDENT },
      { $pull: { classIds: classId } },
      { new: true }
    );

    if (!updatedStudent)
      throw createError(404, `Student with id (${studentId}) not Found`);

    //Delete StudentId From Class Table's StudentIds Array
    const updatedClass = await Class.findOneAndUpdate(
      { _id: classId },
      { $pull: { studentIds: studentId } },
      { new: true }
    );

    res.status(201).json({
      msg: "Student sucessfully Deleted From Class",
      updatedStudent,
      updatedClass,
    });
  } catch (err) {
    next(err);
  }
};

export const updateClassName = async (req, res, next) => {
  try {
    const { className } = req.body;
    const { classId } = req.params;

    //Check if Class Exists
    const existingClass = await Class.findById(classId);
    if (!existingClass)
      throw createError(404, `Class with id (${classId}) not Found`);

    //Delete StudentId From Class Table's StudentIds Array
    const updatedClass = await Class.findOneAndUpdate(
      { _id: classId },
      { className: className },
      { new: true }
    );

    res.status(201).json({
      msg: "ClassName sucessfully Updated",
      updatedClass,
    });
  } catch (err) {
    next(err);
  }
};

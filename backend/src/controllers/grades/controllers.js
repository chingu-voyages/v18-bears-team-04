import Grades from "../../models/grades";
import User, { userRole } from "../../models/users";
import createError from "http-errors";

export const createGrade = async (req, res, next) => {
  try {
    const { teacherName, assignmentId, userId } = req.body;
    //User validation
    const user = await User.findOne({ userName: teacherName });
    if (!user) throw createError(404, `Teacher ${teacherName} not found`);

    //Authorization Validation
    if (user.role != userRole.TEACHER) {
      throw createError(404, `User ${teacherName} is not a Teacher`);
    }
    const checkMatchingFields = await Grades.findOne(
      { assignmentId },
      { userId }
    );
    if (checkMatchingFields)
      throw createError(
        404,
        `You graded user with Id ${userId} on assignemnt Id ${assignmentId}`
      );
    const grade = await Grades.create(req.body);
    res.status(201).json({
      msg: "Success",
      grade,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllGrades = async (req, res, next) => {
  try {
    const grades = await Grades.find().lean();
    if (!grades) throw createError(404, `Grades Not found!`);
    res.status(200).json({
      msg: "list of all Grades Created",
      grades,
    });
  } catch (err) {
    next(err);
  }
};

export const findUserGrade = async (req, res, next) => {
  try {
    // Find a Student Grade by Id
    const { userId } = req.params;
    const activeGrade = await Grades.findOne({ userId });
    if (!activeGrade)
      throw createError(404, `Student with Id ${userId} not found`);
    await Grades.findOne({ userId })
      .populate("userId")
      .exec(function (err, grades) {
        if (err) {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              message: `User not found with given userId ${userId}`,
            });
          }
        }
        res.status(200).json(grades);
      });
  } catch (err) {
    next(err);
  }
};

export const deleteUserGradeById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    //Validate if user exist in DB
    const validateId = await Grades.findOne({ userId });
    if (!validateId)
      throw createError(404, `Assignment Id ${userId} does not exist`);

    //Delete Grade from DB
    await Grades.findOneAndDelete({ userId });
    res.status(200).json({
      msg: `Grade Deleted Successfully`,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAllGrades = async (req, res, next) => {
  try {
    await Grades.deleteMany({});
    res.status(200).json({
      msg: "Deleted all",
    });
  } catch (e) {
    next(e);
  }
};

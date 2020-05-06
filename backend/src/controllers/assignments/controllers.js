import Assignment from "../../models/assignments";
import { status } from "../../models/assignmentResults";
import createError from "http-errors";
import User, { userRole } from "../../models/users";
import Class from "../../models/classes";
import notifications from "../../helper/notifications";

//Request Body must contain classId, title and dueDate
//Given the Assignment is a part of the Class, all students of the Class
//are added to the Assignment (in the Assignment Results object).
export const createAssignment = async (req, res, next) => {
  try {
    const { classId } = req.body;

    //validate if class exists
    const existingClass = await Class.findById(classId);
    if (!existingClass)
      throw createError(404, `Class with id ${classId} dose not exist`);
    //create an new Assignment
    const assignment = await Assignment.create(req.body);

    //Add all the StudentIds in the Given Class to the AssignmentResults objects
    const studentIds = existingClass.studentIds;

    let assignmentResults = [];

    studentIds.forEach((studentId) => {
      let assignmentResult = { studentId: null };
      assignmentResult.studentId = studentId;
      assignmentResults.push(assignmentResult);
    });

    //update the assignment
    assignment.assignmentResults = assignmentResults;
    await assignment.save();

    //Send both email and in-app notification
    await notifications.sendStudentsNotification(
      req.body.assignmentId,
      assignment.classId,
      assignment.title
    );
    res.status(200).json({
      msg: "Assignment created successfully",
      assignment,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAssignment = async (_req, res, next) => {
  try {
    const assignments = await Assignment.find().lean();
    res.status(200).json(assignments);
  } catch (err) {
    next(err);
  }
};

export const teacherUpdatesAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;
    const { title, instructions } = req.body;

    //validate if assignment exists in DB
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment)
      throw createError(404, `Assignment id ${assignmentId} does not exist`);

    //Update Title and Instructions only if they were passed
    assignment.title = title != null ? title : assignment.title;
    assignment.instructions =
      instructions != null ? instructions : assignment.instructions;

    await assignment.save();

    //Update the existing assignment
    res.status(200).json({
      msg: "Assignment Updated Successfully",
      assignment,
    });
  } catch (err) {
    next(err);
  }
};

export const studentSubmitsAssignment = async (req, res, next) => {
  try {
    const {
      studentId,
      assignmentId,
      studentAnswers,
      studentFeedback,
    } = req.body;

    //validate if assignment exists in DB
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment)
      throw createError(
        404,
        `Assignment with id ${assignmentId} does not exist`
      );

    //User validation
    const user = await User.findById(studentId);
    if (!user) throw createError(404, `Student with id ${studentId} not found`);

    //Authorization Validation
    if (user.role != userRole.STUDENT) {
      throw createError(404, `User with id ${studentId} is not a Student`);
    }

    let assignmentResults = assignment.assignmentResults;

    let assgnResultIndex = assignmentResults.findIndex(
      (assignmentResult) => assignmentResult.studentId == studentId
    );

    if (assgnResultIndex === -1)
      throw createError(
        404,
        `Student with id ${studentId} is not Assigned this Assignment`
      );

    //Update the Assignment
    assignment.assignmentResults[assgnResultIndex].status = status.SUBMITTED;
    assignment.assignmentResults[assgnResultIndex].submittedOnDate = Date.now();
    if (studentAnswers != null) {
      assignment.assignmentResults[
        assgnResultIndex
      ].studentAnswers = studentAnswers;
    }
    if (studentFeedback != null) {
      assignment.assignmentResults[
        assgnResultIndex
      ].studentFeedback = studentFeedback;
    }
    await assignment.save();

    await notifications.sendTeachersNotification(
      req.body.assignmentId,
      assignment.classId,
      user.userName
    );
    return res.status(200).json({
      msg: "Assignment Updated Successfully",
      assignment,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteSingleAssignmentById = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;

    //Validate if assignment exist in DB
    const validateId = await Assignment.findById(assignmentId);
    if (!validateId)
      throw createError(404, `Assignment Id ${assignmentId} does not exist`);

    //Delete assignment from DB
    await Assignment.findOneAndDelete({ _id: assignmentId });
    res.status(200).json({
      msg: `Assignment Deleted Successfully`,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAllAssignment = async (req, res, next) => {
  try {
    await Assignment.deleteMany({});
    res.status(200).json({
      msg: "Deleted All Assignments",
    });
  } catch (e) {
    next(e);
  }
};

//Grading Asignment
export const teacherGradesAssignment = async (req, res, next) => {
  try {
    const { assignmentId, studentId, grade } = req.body;

    //validate whether assignment exists in the DB
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment)
      throw createError(
        404,
        `Assignment with id ${assignmentId} does not exist`
      );

    //Validate the studentId
    const user = await User.findById(studentId);
    if (!user)
      throw createError(404, `Student with Id (${studentId}) not Found`);

    //Check if User is a Student
    if (user.role != userRole.STUDENT)
      throw createError(404, `User with id (${studentId}) is not a Student`);

    const assignmentResults = assignment.assignmentResults;

    //Find the Index of the assignmentResult Object that matches the passed studentId
    let assgnResultIndex = assignmentResults.findIndex(
      (assignmentResultObj) => assignmentResultObj.studentId == studentId
    );

    if (assgnResultIndex === -1)
      throw createError(
        404,
        `Student with id ${studentId} is not Assigned this Assignment`
      );

    assignment.assignmentResults[assgnResultIndex].grade = grade;
    assignment.assignmentResults[assgnResultIndex].status = status.GRADED;
    await assignment.save();

    res.status(200).json({
      msg: "Assignment Graded Successfully",
      assignment,
    });
  } catch (err) {
    next(err);
  }
};

//Grading Asignment
export const teacherGivesFeedback = async (req, res, next) => {
  try {
    const { assignmentId, studentId, teacherFeedback } = req.body;

    //validate whether assignment exists in the DB
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment)
      throw createError(
        404,
        `Assignment with id ${assignmentId} does not exist`
      );

    //Validate the studentId
    const user = await User.findById(studentId);
    if (!user)
      throw createError(404, `Student with Id (${studentId}) not Found`);

    //Check if User is a Student
    if (user.role != userRole.STUDENT)
      throw createError(404, `User with id (${studentId}) is not a Student`);

    const assignmentResults = assignment.assignmentResults;

    //Find the Index of the assignmentResult Object that matches the passed studentId
    let assgnResultIndex = assignmentResults.findIndex(
      (assignmentResultObj) => assignmentResultObj.studentId == studentId
    );

    if (assgnResultIndex === -1)
      throw createError(
        404,
        `Student with id ${studentId} is not Assigned this Assignment`
      );

    assignment.assignmentResults[
      assgnResultIndex
    ].teacherFeedback = teacherFeedback;
    await assignment.save();

    res.status(200).json({
      msg: "Teacher Added FeedBack to Assignment Successfully",
      assignment,
    });
  } catch (err) {
    next(err);
  }
};

export const studentGivesFeedback = async (req, res, next) => {
  try {
    const { assignmentId, studentId, studentFeedback } = req.body;

    //validate whether assignment exists in the DB
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment)
      throw createError(
        404,
        `Assignment with id ${assignmentId} does not exist`
      );

    //Validate the studentId
    const user = await User.findById(studentId);
    if (!user)
      throw createError(404, `Student with Id (${studentId}) not Found`);

    //Check if User is a Student
    if (user.role != userRole.STUDENT)
      throw createError(404, `User with id (${studentId}) is not a Student`);

    const assignmentResults = assignment.assignmentResults;

    //Find the Index of the assignmentResult Object that matches the passed studentId
    let assgnResultIndex = assignmentResults.findIndex(
      (assignmentResultObj) => assignmentResultObj.studentId == studentId
    );

    if (assgnResultIndex === -1)
      throw createError(
        404,
        `Student with id ${studentId} is not Assigned this Assignment`
      );

    assignment.assignmentResults[
      assgnResultIndex
    ].studentFeedback = studentFeedback;
    await assignment.save();

    res.status(200).json({
      msg: "Student Added FeedBack to Assignment Successfully",
      assignment,
    });
  } catch (err) {
    next(err);
  }
};

//Get all result for a specific student
export const getResultsForAStudentInAllAssignments = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    //Validate the studentId
    const user = await User.findById(studentId);
    if (!user)
      throw createError(404, `Student with Id (${studentId}) not Found`);

    //Check if User is a Student
    if (user.role != userRole.STUDENT)
      throw createError(404, `User with id (${studentId}) is not a Student`);

    const classIds = await getClassIdsByUserId(studentId);

    //All these assignments have a the student with the given student id,
    const assignments = await Assignment.find({ classId: { $in: classIds } });

    let assignmentResults = [];

    assignments.forEach((assgn) => {
      let currAssgnResults = assgn.assignmentResults;
      assignmentResults.push(...currAssgnResults);
    });

    const studentAssgnResults = assignmentResults.filter((assgnResult) => {
      return (
        assgnResult.studentId == studentId &&
        assgnResult.status == status.GRADED
      );
    });

    res.status(200).json({
      results: studentAssgnResults,
    });
  } catch (err) {
    next(err);
  }
};

//Get a specific grade for a Single Student for a single assignment
export const getAStudentResultByAssignmentId = async (req, res, next) => {
  try {
    const { assignmentId, studentId } = req.params;
    //Verify if assignment exist in Database
    //validate whether assignment exists in the DB
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment)
      throw createError(
        404,
        `Assignment with id ${assignmentId} does not exist`
      );

    //Validate the studentId
    const user = await User.findById(studentId);
    if (!user)
      throw createError(404, `Student with Id (${studentId}) not Found`);

    //Check if User is a Student
    if (user.role != userRole.STUDENT)
      throw createError(404, `User with id (${studentId}) is not a Student`);

    const assignmentResults = assignment.assignmentResults;

    //Find the Index of the assignmentResult Object that matches the passed studentId
    let assgnResult = assignmentResults.filter(
      (assignmentResultObj) => assignmentResultObj.studentId == studentId
    );

    res.status(200).json({
      result: assgnResult,
    });
  } catch (err) {
    next(err);
  }
};

const getClassIdsByUserId = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw createError(404, `User with id (${userId}) not Found`);

  const classIds = user.classIds;
  return classIds;
};

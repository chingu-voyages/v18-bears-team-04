import Assignment from "../../models/assignments";
import createError from "http-errors";
import User, { userRole } from "../../models/users";
import Class from "../../models/classes";
import notifications from "../../helper/notifications";

export const createAssignment = async (req, res, next) => {
  try {
    const { teacherName, classId, userId, title } = req.body;

    //User validation
    const user = await User.findOne({ userName: teacherName });
    if (!user) throw createError(404, `Teacher ${teacherName} not found`);

    //Authorization Validation
    if (user.role != userRole.TEACHER) {
      throw createError(404, `User ${teacherName} is not a Teacher`);
    }

    //validate if class exist
    const existingClass = await Class.findById(classId);
    if (!existingClass)
      throw createError(404, `Claas ${classId} dose not exist`);

    const userHasAssignment = await Assignment.findOne({ userId });
    const titleExist = await Assignment.findOne({ title });
    if (userHasAssignment && titleExist)
      throw createError(
        401,
        "User Cannot have the same assignment twice. Change the title and description to proceed"
      );

    //create a new Assignment
    const assignment = await Assignment.create(req.body);
    //response object
    await notifications.sendStudentsNotification(
      req.body.assignmentId,
      assignment.userId[0],
      assignment.title
    );
    res.status(201).json({
      msg: "Assignment created",
      assignment,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAssignment = async (_req, res, next) => {
  try {
    const assignments = await Assignment.find().lean();
    if (!assignments) throw err;
    res.status(200).json(assignments);
  } catch (err) {
    next(err);
  }
};
export const getUserAssignmentById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const activeAssigment = await Assignment.findOne({ userId });
    if (!activeAssigment)
      throw createError(404, `Assignment with Id ${userId} not found`);
    await Assignment.findOne({ userId })
      .populate("gradeId classId")
      .exec((err, result) => {
        if (err) {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              msg: `Assignment Id ${userId} does not exist`,
            });
          }
          return res.status(500).send({
            msg: `Error retrieving Assignment with the given Id ${userId}`,
          });
        }
        res.status(200).json(result);
      });
  } catch (err) {
    next(err);
  }
};

export const updateAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;

    //validate if assignment exist in DB
    const validateId = await Assignment.findById(assignmentId);

    if (!validateId)
      throw createError(404, `Assignment id ${assignmentId} does not exist`);

    //Update the existing assignment
    const newAssignment = await Assignment.findOneAndUpdate(
      { _id: assignmentId },
      { $set: req.body },
      { new: true }
    );
    if (true) {
      res.status(200).json({
        msg: "Assignment Updated Successfully",
        newAssignment,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const submitAssignment = async (req, res, next) => {
    try {
        const { studentName } = req.body;
        const { assignmentId } = req.params;
      
        //validate if assignment exist in DB
        const validateId = await Assignment.findById(assignmentId);
        if (!validateId)
          throw createError(404, `Assignment id ${assignmentId} does not exist`);
      
        //User validation
        const user = await User.findOne({ userName: studentName });
        if (!user) throw createError(404, `Student ${studentName} not found`);
      
        //Authorization Validation
        if (user.role != userRole.STUDENT) {
          throw createError(404, `User ${studentName} is not a Student`);
        }
        //Submit an assignment
          const submitAssignment = await Assignment.findOneAndUpdate(
            { _id: assignmentId },
            { $set: req.body},
            { new: true }
          );
          if (true) {
              await notifications.sendStudentsNotification(
                  submitAssignment.assignmentId,
                  submitAssignment.userId[0],
                  submitAssignment.title
          );
            res.status(200).json({
              msg: "Assignment Updated Successfully",
              submitAssignment,
            });
          }
    } catch (err) {
    next(err)
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

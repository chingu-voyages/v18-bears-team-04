import Assignment from "../../models/assignments";
import createError from "http-errors";
import User, { userRole } from "../../models/users";
import Class from "../../models/classes";
import notifications from "../../helper/notifications";

export const createAssignment = async (req, res, next) => {
  try {
    const { teacherName, classId } = req.body;

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

    //create a new Assignment
    const assignment = await Assignment.create(req.body);
    //response object
    // await notifications.sendStudentsNotification(
    //   req.body.assignmentId,
    //   assignment.userId[0],
    //   assignment.title
    // );
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
export const getAllAssignmentByStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    let assignments = await Assignment.findOne({ submitted: status });
    if (!assignments) throw createError(404, `Assignment ${status} not found`);
    if (assignments.submitted === true) {
      return res.status(200).json(assignments);
    }
    if (assignments.submitted === false) {
      return res.status(200).json(assignments);
    }
  } catch (err) {
    next(err);
  }
};

export const updateAssignment = async (req, res, next) => {
  try {
    const { assignmentId, teacherName } = req.params;

    //validate if assignment exist in DB
    const validateId = await Assignment.findById(assignmentId);
    console.log(validateId.submitted, "validate");

    if (!validateId)
      throw createError(404, `Assignment id ${assignmentId} does not exist`);

    //User validation
    const user = await User.findOne({ userName: teacherName });
    if (!user) throw createError(404, `Teacher ${teacherName} not found`);

    //Authorization Validation
    if (user.role != userRole.TEACHER) {
      throw createError(404, `User ${teacherName} is not a Teacher`);
    }
    if (validateId.submitted === true)
      throw createError(403, `You cannot edit a submiited assignment`);
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
    const { studentName, assignmentId } = req.params;
    //Date function to help update the date of assignment submission
    const daysFunction = () => {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let dateObj = new Date();
      let month = monthNames[dateObj.getMonth()];
      let day = String(dateObj.getDate()).padStart(2, "0");
      let year = dateObj.getFullYear();
      let output = month + "\n" + day + "," + year;
      return output;
    };
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
    // Create a new note and pass the req.body to the entry
    const solveAssignemt = await Assignment.findOneAndUpdate(
      { _id: assignmentId },
      { $set: req.body, submitted: true, status: daysFunction() },
      { new: true }
    );
    if (true) {
      user.assignmentIds.push(solveAssignemt);
      await user.save();
      return res.status(200).json({
        msg: "Assignment Updated Successfully",
        solveAssignemt,
      });
    }
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

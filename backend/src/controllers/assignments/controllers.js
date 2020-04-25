import Assignment from "../../models/assignments";
import createError from "http-errors";
import User, { userRole } from "../../models/users";
import Class from "../../models/classes";
import notifications from "../../helper/notifications";

//Create an assignment. Req.body must include classId, title,
//dueDate. Date must be a JSON Date. Example: '2020-05-26T07:56:00.123Z'
export const createAssignment = async (req, res, next) => {
  try {
    const { classId } = req.body;
    //validate if class exist
    const existingClass = await Class.findById(classId);
    if (!existingClass)
      throw createError(404, `Claas ${classId} does not exist`);

    //create an new Assignment
    const assignment = await Assignment.create(req.body);

    //Add all students that belong to the class, to the Assignment Results object
    //Array of Students
    const studentIds = existingClass.studentIds;

    studentIds.foreach(async (studentId) => {
      await Assignment.findOneAndUpdate(
        { _id: assignment._id },
        {
          $push: {
            assignmentResults: {
              studentId,
            },
          },
        }
      );
    });

    //Send both email and in-app notification
    await notifications.sendStudentsNotification(
      req.body.assignmentId,
      assignment.classId,
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

//Req.body must include the studentId
export const addStudentToAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;
    const { studentId } = req.body;

    //check if assignment exists in the db
    const existingAssignment = await Assignment.findById(assignmentId);
    if (!existingAssignment)
      throw createError(
        404,
        `Assignment with id ${assignmentId} does not exist`
      );

    //check if user exists in the db
    const user = await User.findOne({ _id: studentId });
    if (!user)
      throw createError(404, `Student with id  (${studentId}) not Found`);

    //Check if User is a Teacher
    if (user.role != userRole.STUDENT)
      throw createError(404, `User with id (${studentId}) is not a Student`);

    //Add StudentId to Class Table's studentIds Array
    const newAssignment = await Assignment.findOneAndUpdate(
      { _id: assignmentId },
      {
        $push: {
          assignmentResults: {
            studentId,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      msg: "Student Added to the Assignment",
      newAssignment,
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
// export const getAllAssignmentByStatus = async (req, res, next) => {
//   try {
//     const { status } = req.params;
//     let assignments = await Assignment.findOne({ submitted: status });
//     if (!assignments) throw createError(404, `Assignment ${status} not found`);
//     if (assignments.submitted === true) {
//       return res.status(200).json(assignments);
//     }
//     if (assignments.submitted === false) {
//       return res.status(200).json(assignments);
//     }
//   } catch (err) {
//     next(err);
//   }
// };

export const updateAssignment = async (req, res, next) => {
  try {
    const { assignmentId, teacherName } = req.params;

    //validate if assignment exist in DB
    const validateId = await Assignment.findById(assignmentId);

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
    if (validateId.submitted === true)
      throw createError(403, "You cannot submit this assignment twice");
    // Create a new note and pass the req.body to the entry
    const solveAssignemt = await Assignment.findOneAndUpdate(
      { _id: assignmentId },
      { $set: req.body, submitted: true, status: daysFunction() },
      { new: true }
    );
    console.log(solveAssignemt, "solveassignement");
    if (true) {
      user.assignmentIds.push(solveAssignemt);
      await user.save();
      console.log(user, "user");
      await notifications.sendTeachersNotification(
        req.body.assignmentId,
        solveAssignemt.classId,
        user.userName
      );
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

//Grading Asignment
export const grade = async (req, res, next) => {
  try {
    const { assignmentId, teacherName } = req.params;

    //validate if assignment exist in DB
    const validateId = await Assignment.findById(assignmentId);

    if (!validateId)
      throw createError(404, `Assignment id ${assignmentId} does not exist`);

    //User validation
    const user = await User.findOne({ userName: teacherName });
    if (!user) throw createError(404, `Teacher ${teacherName} not found`);

    //Authorization Validation
    if (user.role != userRole.TEACHER) {
      throw createError(404, `User ${teacherName} is not a Teacher`);
    }
    if (validateId.submitted === true) {
      //Grade student assignment
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
    } else {
      throw createError(403, `You cannot edit a submiited assignment`);
    }
  } catch (err) {
    next(err);
  }
};

//Get all result for a specific student
export const getAllGradeForAStudent = async (req, res, next) => {
  try {
    const { studentName } = req.params;

    //Check if student exist in Database
    await User.findOne({ userName: studentName })
      .populate("assignmentIds") //Get all parameters from the Id
      .exec((err, result) => {
        if (err) {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              msg: `Grades does not exist`,
            });
          }
          return res.status(500).send({
            msg: `Error retrieving Student grade`,
          });
        }
        //Map out all grades for a particular student from student assignmentId
        const getStudentGrades = result.assignmentIds
          .map(({ assignmentResults }) => assignmentResults)
          .filter((assignmentResults) => assignmentResults);
        res.status(200).json({
          msg: "Student Grades",
          getStudentGrades,
        });
      });
  } catch (err) {
    next(err);
  }
};

//Get a specific grade for ana assignment by Id
export const getASingleGradeByAssignmentId = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;
    //Verify if assignment exist in Database
    const verifyAssignmentExistence = await Assignment.findById({
      _id: assignmentId,
    });
    if (!verifyAssignmentExistence)
      throw createError(404, "Assignment does not exist");
    res.status(200).json({
      msg: "Assignment Grade",
      data: verifyAssignmentExistence.assignmentResults,
    });
  } catch (err) {
    next(err);
  }
};

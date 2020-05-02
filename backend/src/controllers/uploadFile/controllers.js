import User from "../../models/users";
import Assignment from "../../models/assignments";
import { userRole } from "../../models/users";
import { v4 as uuidv4 } from "uuid";
const PUBLIC_FOLDER_URL = "./public/uploads";
const PROFILE_URL = "/profile";
const TEACHER_ASSIGNMENT_URL = "/teacher/assignment";
const STUDENT_ASSIGNMENT_URL = "/student/assignment";
import createError from "http-errors";

export const uploadUserProfilePict = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    if (!user) throw createError(404, `User with Id (${userId}) not found`);

    if (!req.files) {
      res.send({
        status: 404,
        message: "No file uploaded",
      });
    }

    //Use the name of the input field (i.e "profile") to retrieve the uploaded file
    let profile = req.files.profile;
    let mimetype = profile.mimetype;
    let ext = mimetype.split("/")[1];

    if (mimetype === "image/jpeg" || mimetype === "image/png") {
      //Use the mv() method to place the file in public directory
      profile.mv(`${PUBLIC_FOLDER_URL}${PROFILE_URL}/${userId}.${ext}`);

      //Save the user profile link to the database
      await User.findByIdAndUpdate(
        { _id: userId },
        { userProfileLink: `${PROFILE_URL}/${userId}.${ext}` }
      );

      //send the response
      res.send({
        status: 200,
        message: "File is uploaded",
        data: {
          name: `${userId}.${ext}`,
          mimetype: profile.mimetype,
          size: profile.size,
        },
      });
    } else {
      res.send({
        status: 404,
        message: "No file uploaded. Only jpeg and png files are accepted.",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const teacherUploadAssignmentDocument = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;
    const assignment = await Assignment.findOne({ _id: assignmentId });
    if (!assignment)
      throw createError(404, `Assignment with Id (${assignment}) not found`);

    console.log("File is below:");
    console.log(req.files);

    if (!req.files) {
      res.send({
        status: 404,
        message: "No file uploaded",
      });
    }

    //Use the name of the input field (i.e "doc") to retrieve the uploaded file
    let doc = req.files.doc;
    let mimetype = doc.mimetype;
    let ext = mimetype.split("/")[1];
    const filename = uuidv4();
    console.log("mimetype is");
    console.log(mimetype);
    if (mimetype === "application/msword" || mimetype === "application/pdf") {
      //Use the mv() method to place the file in Public directory
      doc.mv(
        `${PUBLIC_FOLDER_URL}${TEACHER_ASSIGNMENT_URL}/${filename}.${ext}`
      );

      //Save the Teacher Doc Link to the database
      await Assignment.findByIdAndUpdate(
        { _id: assignmentId },
        {
          $push: {
            teacherDocLink: `${TEACHER_ASSIGNMENT_URL}/${filename}.${ext}`,
          },
        }
      );

      //send the response
      res.send({
        status: 200,
        message: "File is uploaded",
        data: {
          name: `${filename}.${ext}`,
          mimetype: doc.mimetype,
          size: doc.size,
        },
        url: `${TEACHER_ASSIGNMENT_URL}/${filename}.${ext}`,
      });
    } else {
      res.send({
        status: 404,
        message: "No file uploaded. Only MS Word and PDF files are accepted.",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const studentUploadAssignmentDocument = async (req, res, next) => {
  try {
    const { assignmentId, studentId } = req.params;
    const assignment = await Assignment.findOne({ _id: assignmentId });
    if (!assignment)
      throw createError(404, `Assignment with Id (${assignment}) not found`);

    //Validate the studentId
    const user = await User.findById(studentId);
    if (!user)
      throw createError(404, `Student with Id (${studentId}) not Found`);

    //Check if User is a Student
    if (user.role != userRole.STUDENT)
      throw createError(404, `User with id (${studentId}) is not a Student`);

    console.log(req);
    if (!req.files) {
      res.send({
        status: 404,
        message: "No file uploaded",
      });
    }

    //Find the Index of the assignmentResult Object that matches the passed studentId
    let assgnResultIndex = assignment.assignmentResults.findIndex(
      (assignmentResultObj) => assignmentResultObj.studentId == studentId
    );

    //Use the name of the input field (i.e "doc") to retrieve the uploaded file
    let doc = req.files.doc;
    let mimetype = doc.mimetype;
    let ext = mimetype.split("/")[1];
    const filename = uuidv4();

    if (mimetype === "application/msword" || mimetype === "application/pdf") {
      //Use the mv() method to place the file in Public directory
      doc.mv(
        `${PUBLIC_FOLDER_URL}${STUDENT_ASSIGNMENT_URL}/${filename}.${ext}`
      );

      //Save the Student Doc Link to the database
      assignment.assignmentResults[assgnResultIndex].studentDocLink.push(
        `${STUDENT_ASSIGNMENT_URL}/${filename}.${ext}`
      );
      await assignment.save();

      //send the response
      res.send({
        status: 200,
        message: "File is uploaded",
        data: {
          name: `${filename}.${ext}`,
          mimetype: doc.mimetype,
          size: doc.size,
        },
        url: `${STUDENT_ASSIGNMENT_URL}/${filename}.${ext}`,
      });
    } else {
      res.send({
        status: 404,
        message: "No file uploaded. Only MS Word and PDF files are accepted.",
      });
    }
  } catch (err) {
    next(err);
  }
};

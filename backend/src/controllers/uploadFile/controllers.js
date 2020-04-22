import User from "../../models/users";
import Assignment from "../../models/assignments";
import { v4 as uuidv4 } from "uuid";
const PUBLIC_FOLDER_URL = "./public/uploads";
const PROFILE_URL = "/profile";
const TEACHER_ASSIGNMENT_URL = "/teacher/assignment";
const STUDENT_ASSIGNMENT_URL = "/student/assignment";

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

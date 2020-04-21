import User from "../../models/users";
const PUBLIC_FOLDER_URL = "./public/uploads";
const PROFILE_URL = "/profile";

export const uploadUserProfilePict = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    }

    //Use the name of the input field (i.e "profile") to retrieve the uploaded file
    let profile = req.files.profile;
    let mimetype = profile.mimetype;
    let ext = mimetype.split("/")[1];

    if (mimetype === "image/jpeg" || mimetype === "image/png") {
      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      profile.mv(`${PUBLIC_FOLDER_URL}${PROFILE_URL}/${userId}.${ext}`);

      //Save the user profile link to the database
      await User.findByIdAndUpdate(
        { _id: userId },
        { userProfileLink: `${PROFILE_URL}/${userId}.${ext}` }
      );

      //send the response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: userId,
          mimetype: profile.mimetype,
          size: profile.size,
        },
      });
    } else {
      res.send({
        status: false,
        message: "No file uploaded. Only jpeg and png files are accepted.",
      });
    }
  } catch (err) {
    next(err);
  }
};

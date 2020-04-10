import User from '../models/user.model';
import serverError from '../helpers/serverError.helper';

/**
 * @description - this method register a new user
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - object
 */

const registerUserController = async (req, res) => {
  const { username, email, userType } = req.body;

  if (!username || !email || !userType) {
    return res.status(200).json({
      success: false,
      msg: 'Registration failed, there are missing fields.',
    });
  }
  try {
    // Check for the unique Username
    let checkUser = await User.findOne({ username });
    if (checkUser) {
      return res.status(401).json({
        success: false,
        msg: 'Username is already taken.',
      });
    }

    // Check for the Unique Email
    let checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(401).json({
        success: false,
        msg: 'Email is already registered. Did you forget your Email?',
      });
    }

    // The data is valid and now we can register the user
    let newUser = new User({
      username,
      email,
      userType,
    });
    let userData = await newUser.save();
    if (userData) {
      return res.status(201).json({
        success: true,
        msg: 'Congrats! User is now registered.',
        data: userData,
      });
    }
  } catch (err) {
    return res.status(500).json({
      errors: serverError,
    });
  }
};

/**
 * @description - this method login a user
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - object
 */

const loginUserController = async (req, res) => {
  const error = ['invalid email address'];
  try {
    const { email } = req.body;
    // Check if User exist in the database
    let checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(401).json({
        errors: {
          body: error,
        },
      });
    }
    //Get user from Database
    let user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({
        success: true,
        msg: `Welcome back ${user.username}`,
        data: user,
      });
    }
  } catch (err) {
    console.log(err, 'err');
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const authController = {
  registerUserController,
  loginUserController,
};
export default authController;

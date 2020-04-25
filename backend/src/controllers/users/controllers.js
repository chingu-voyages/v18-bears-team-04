import User from "../../models/users";
import createError from "http-errors";
import notifications from "../../helper/notifications";

export const getEveryUser = async (_req, res, next) => {
  try {
    const users = await User.find().lean();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserByParams = async (req, res, next) => {
  try {
    let { userName } = req.query;
    let { userId } = req.query;

    const user = await User.findOne({
      $or: [{ _id: userId }, { userName: userName }],
    });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    //create a user
    const newUser = await User.create(req.body);
    let msg = newUser.userName;
    let role = newUser.role;
    await notifications.signupEmail(newUser.email, role, msg);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOneAndDelete({ _id: userId });
    if (!user) throw createError(404, `User with Id (${userId}) not found`);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

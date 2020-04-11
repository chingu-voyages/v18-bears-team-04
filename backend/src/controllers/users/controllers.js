import User from "../../models/users";
import createError from "http-errors";

export const getEveryUser = async (_req, res, next) => {
  try {
    const users = await User.find().lean();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    //Find the username
    const { userName } = req.params;

    const user = await User.findOne({ userName });
    if (!user) throw createError(404, `User (${userName}) not found`);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    //create a user
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

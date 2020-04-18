import { Router } from "express";
import {
  getEveryUser,
  getUserByName,
  createUser,
  deleteUserById,
} from "./controllers";
const router = Router();

router.get("/", getEveryUser);
router.get("/name/:userName", getUserByName);
router.post("", createUser);
router.delete("/id/:userId", deleteUserById);

export default router;

import { Router } from "express";
import {
  getEveryUser,
  getUserByParams,
  createUser,
  deleteUserById,
} from "./controllers";
const router = Router();

router.get("/all", getEveryUser);

//Get User Based on UserName or UserId
//Examples requests:1) http://localhost:5000/api/user/?userName=lewis
//2) http://localhost:5000/api/user/?userId=5ea3f5e21fc0296afd2fdaa4
router.get("", getUserByParams);

router.post("", createUser);

router.delete("/id/:userId", deleteUserById);

export default router;

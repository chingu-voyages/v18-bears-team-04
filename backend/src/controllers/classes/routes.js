import { Router } from "express";
import {
  createClass,
  addStudentToClass,
  getAllClasses,
  getClassFromId,
  getClassesByUserName,
} from "./controllers";
const router = Router();

router.get("", getAllClasses);
router.get("/:classId", getClassFromId);
router.get("/user/:userName", getClassesByUserName);
router.post("", createClass);
router.put("/:classId/student/:studentName", addStudentToClass);

export default router;

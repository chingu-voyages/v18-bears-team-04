import { Router } from "express";
import {
  createClass,
  addStudentToClass,
  getAllClasses,
  getClassFromId,
  getClassesByUserName,
  deleteStudentFromClass,
} from "./controllers";
const router = Router();

router.get("", getAllClasses);
router.get("/:classId", getClassFromId);
router.get("/user/:userName", getClassesByUserName);
router.post("", createClass);
router.put("/:classId/student/:studentId", addStudentToClass);
router.delete("/:classId/student/:studentId", deleteStudentFromClass);

export default router;

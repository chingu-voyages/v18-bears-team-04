import { Router } from "express";
import {
  createClass,
  addStudentToClass,
  getAllClasses,
  getClassFromId,
} from "./controllers";
const router = Router();

router.get("", getAllClasses);
router.get("/:classId", getClassFromId);
router.post("", createClass);
router.put("/:studentName", addStudentToClass);

export default router;

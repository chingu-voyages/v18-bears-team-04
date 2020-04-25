import { Router } from "express";

import {
  createAssignment,
  getAllAssignment,
  updateAssignment,
  deleteSingleAssignmentById,
  deleteAllAssignment,
  submitAssignment,
  getAllAssignmentByStatus,
  teacherGradesAssignment,
  getAllGradeForAStudent,
  getASingleGradeByAssignmentId,
} from "./controllers";

const router = Router();

//Get all assignments
router.get("/all", getAllAssignment);

//Teacher creates an assignment
//Request Body must contain classId, title and dueDate
//dueDate must be in format ISO 8601/JSON date eg. "2020-05-26T07:56:00.123Z"
router.post("/", createAssignment);

//Student submit an assignment
router.post("/:assignmentId/student/:studentName", submitAssignment);

//Grade an assignment
router.put("/grade", teacherGradesAssignment);

//Get all assignment status by adding true or false as a status
router.get("/assignment/:status", getAllAssignmentByStatus);

//Get a singles student grades
router.get("/grade/:studentName", getAllGradeForAStudent);

//Get a single grade by an assignment Id
router.get("/grade/assignment/:assignmentId", getASingleGradeByAssignmentId);

//Update an assignment
router.put("/:assignmentId/teacher/:teacherName", updateAssignment);

//Teacher delete an assignment
router.delete("/:assignmentId", deleteSingleAssignmentById);

//Teacher delete all assignment
router.delete("", deleteAllAssignment);

export default router;

import { Router } from "express";

import {
  createAssignment,
  getAllAssignment,
  teacherUpdatesAssignment,
  deleteSingleAssignmentById,
  deleteAllAssignment,
  studentSubmitsAssignment,
  teacherGradesAssignment,
  getAllGradeForAStudent,
  getASingleGradeByAssignmentId,
  getAllAssignmentsForClass,
} from "./controllers";

const router = Router();

//Get all assignments
router.get("/all", getAllAssignment);

//Teacher creates an assignment
//Request Body must contain classId, title and dueDate
//dueDate must be in format ISO 8601/JSON date eg. "2020-05-26T07:56:00.123Z"
router.post("/", createAssignment);

//Student submits an assignment
router.put("/submit", studentSubmitsAssignment);

//Grade an assignment
router.put("/grade", teacherGradesAssignment);

//Get all Assignments For a Class
router.get("/class/:classId", getAllAssignmentsForClass);

//Teacher Updates assignment's Title or Instructions
router.put("/:assignmentId", teacherUpdatesAssignment);

//Teacher delete an assignment
router.delete("/:assignmentId", deleteSingleAssignmentById);

//Teacher delete all assignment
router.delete("", deleteAllAssignment);

//Get a singles student grades
router.get("/grade/:studentName", getAllGradeForAStudent);

//Get a single grade by an assignment Id
router.get("/grade/assignment/:assignmentId", getASingleGradeByAssignmentId);

export default router;

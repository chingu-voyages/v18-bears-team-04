import { Router } from "express";

import {
  createAssignment,
  getAllAssignment,
  teacherUpdatesAssignment,
  deleteSingleAssignmentById,
  deleteAllAssignment,
  studentSubmitsAssignment,
  teacherGradesAssignment,
  getResultsForAStudentInAllAssignments,
  getAStudentResultByAssignmentId,
  teacherGivesFeedback,
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

//Get a single student results in All Assignment
router.get("/all/result/:studentId", getResultsForAStudentInAllAssignments);

//Get a single grade by an assignment Id
router.get("/:assignmentId/result/:studentId", getAStudentResultByAssignmentId);

//Grade an assignment
router.put("/grade", teacherGradesAssignment); //same

//Teacher gives Feedback for assignment
router.put("/feedback", teacherGivesFeedback); //same

//Teacher Updates assignment's Title or Instructions
router.put("/:assignmentId", teacherUpdatesAssignment); //same

//Teacher deletes an assignment
router.delete("/:assignmentId", deleteSingleAssignmentById);

//Teacher delete all assignment
router.delete("/all", deleteAllAssignment);

export default router;

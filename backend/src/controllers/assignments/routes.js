import { Router } from "express";

import {
  createAssignment,
  getAllAssignment,
  updateAssignment,
  deleteSingleAssignmentById,
  deleteAllAssignment,
  submitAssignment,
  //getAllAssignmentByStatus,
  addStudentToAssignment,
  grade,
  getAllGradeForAStudent,
  getASingleGradeByAssignmentId,
} from "./controllers";

const router = Router();

//Get all assignments
router.get("", getAllAssignment);

//Get all assignment status by adding true or false as a status
// router.get("/assignment/:status", getAllAssignmentByStatus)

//Get a singles student grades
router.get("/grade/:studentName", getAllGradeForAStudent);

//Get a single grade by an assignment Id
router.get("/grade/assignment/:assignmentId", getASingleGradeByAssignmentId);
//Grade an assignment
router.post("/:assignmentId/teacher/:teacherName", grade);

//Update an assignment
router.put("/:assignmentId/teacher/:teacherName", updateAssignment);

//Student submit an assignment
router.post("/:assignmentId/student/:studentName", submitAssignment);

//An assignment is created for a class. All  the students in the class are automatically added.
router.post("/", createAssignment);

router.put("/:assignmentId", addStudentToAssignment);

//Teacher delete an assignment
router.delete("/:assignmentId", deleteSingleAssignmentById);

//Teacher delete all assignment
router.delete("", deleteAllAssignment);

export default router;

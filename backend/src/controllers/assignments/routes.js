import { Router } from 'express';

import { 
createAssignment,
getAllAssignment,
updateAssignment,
deleteSingleAssignmentById,
deleteAllAssignment,
submitAssignment,
getAllAssignmentByStatus,
grade,
getAllResultForAStudent 
} from './controllers';

const router = Router();

//Get all assignments
router.get("", getAllAssignment);

//Get all assignment status by adding true or false as a status
router.get("/assignment/:status", getAllAssignmentByStatus)
router.get("/grade/:studentName", getAllResultForAStudent)
//Grade an assignment
router.post("/:assignmentId/teacher/:teacherName", grade);

//Update an assignment
router.put("/:assignmentId/teacher/:teacherName", updateAssignment);

//Student submit an assignment
router.post("/:assignmentId/student/:studentName", submitAssignment)

//Teacher creates an assignment
router.post("/", createAssignment);

//Teacher delete an assignment
router.delete("/:assignmentId", deleteSingleAssignmentById);

//Teacher delete all assignment
router.delete("", deleteAllAssignment);

export default router;

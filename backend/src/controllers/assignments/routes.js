import { Router } from 'express';

import { 
createAssignment,
getAllAssignment,
updateAssignment,
deleteSingleAssignmentById,
deleteAllAssignment,
submitAssignment,
getAllAssignmentByStatus 
} from './controllers';

const router = Router();

//Get all assignments
router.get("", getAllAssignment);

//Get all assignment status by adding true or false as a status
router.get("/assignment/:status", getAllAssignmentByStatus)

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

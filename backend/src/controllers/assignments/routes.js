import { Router } from 'express';

import { 
createAssignment,
getAllAssignment,
getUserAssignmentById,
updateAssignment,
deleteSingleAssignmentById,
deleteAllAssignment,
submitAssignment,
} from './controllers';

const router = Router();
router.get("", getAllAssignment);
router.put("/:assignmentId", updateAssignment);
router.post("/submit/:assignmentId", submitAssignment)
router.get("/assignment/:userId", getUserAssignmentById)
router.post("/", createAssignment);
router.delete("/:assignmentId", deleteSingleAssignmentById);
router.delete("", deleteAllAssignment);

export default router;

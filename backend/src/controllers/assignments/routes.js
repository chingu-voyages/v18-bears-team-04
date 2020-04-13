import { Router } from 'express';

import { 
createAssignment,
getAllAssignment,
getAssignmentById,
updateAssignment,
deleteSingleAssignmentById,
} from './controllers';

const router = Router();
router.get("", getAllAssignment);
router.get("/:assignmentId", getAssignmentById)
router.post("/", createAssignment);
router.put("/:assignmentId", updateAssignment);
router.delete("/:assignmentId", deleteSingleAssignmentById);

export default router;

import { Router } from "express";

import {
  uploadUserProfilePict,
  teacherUploadAssignmentDocument,
} from "./controllers";

const router = Router();
router.put("/profile/:userId", uploadUserProfilePict);
router.put("/teacherAssignment/:assignmentId", teacherUploadAssignmentDocument);
// router.put("/studentAssignment/:assignmentId", studentUploadAssignmentDocument);

export default router;

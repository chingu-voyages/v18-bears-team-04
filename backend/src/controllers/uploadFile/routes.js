import { Router } from "express";

import {
  uploadUserProfilePict,
  teacherUploadAssignmentDocument,
  studentUploadAssignmentDocument,
} from "./controllers";

const router = Router();
router.put("/profile/:userId", uploadUserProfilePict);
router.put("/assignment/:assignmentId", teacherUploadAssignmentDocument);
router.put(
  "/assignment/:assignmentId/student/:studentId",
  studentUploadAssignmentDocument
);

export default router;

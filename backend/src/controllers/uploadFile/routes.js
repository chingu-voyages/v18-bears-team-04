import { Router } from "express";

import { uploadUserProfilePict } from "./controllers";

const router = Router();
router.put("/:userId", uploadUserProfilePict);

export default router;

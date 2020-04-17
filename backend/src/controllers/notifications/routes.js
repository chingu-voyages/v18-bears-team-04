import { Router } from 'express';

import {
    updateIsSeenColumn,
    getAllNotifications,
    deleteNotifications
} from './controllers';

const router = Router();
router.get("/notifications/:assignmentId", updateIsSeenColumn);
router.get("", getAllNotifications);
router.delete("", deleteNotifications);

export default router;
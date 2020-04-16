import { Router } from 'express';

import {
    createGrade,
    getAllGrades,
    findUserGrade,
    deleteAllGrades,
    deleteUserGradeById
} from './controllers';

const router = Router();
router.get("", getAllGrades);
router.get("/grades/:userId", findUserGrade)
router.post("", createGrade);
router.delete("/grades/:userId", deleteUserGradeById)
router.delete("", deleteAllGrades);

export default router;
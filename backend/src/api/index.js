import { Router } from "express";
import UserController from "../controllers/users";
import ClassController from "../controllers/classes";
import AssignmentController from "../controllers/assignments";

const router = Router();

//Index Route ---/api
router.get("/", (_, res) => res.send("v18 Bears API"));
router.use("/user", UserController);
router.use("/class", ClassController);
router.use("/assignment", AssignmentController);

export default router;

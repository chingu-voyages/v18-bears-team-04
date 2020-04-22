import { Router } from "express";
import UserController from "../controllers/users";
import ClassController from "../controllers/classes";
import AssignmentController from "../controllers/assignments";
import UploadFileController from "../controllers/uploadFile";
import NotificationController from "../controllers/notifications";

const router = Router();

//Index Route ---/api
router.get("/", (_, res) => res.send("v18 Bears API"));
router.use("/user", UserController);
router.use("/class", ClassController);
router.use("/assignment", AssignmentController);
router.use("/notification", NotificationController);
router.use("/upload", UploadFileController);

export default router;

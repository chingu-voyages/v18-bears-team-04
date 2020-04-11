import { Router } from "express";
import UserController from "../controllers/users";
import ClassController from "../controllers/classes";

const router = Router();

//Index Route ---/api
router.get("/", (_, res) => res.send("v18 Bears API"));
router.use("/user", UserController);
router.use("/class", ClassController);

export default router;

import { Router } from "express";
import UserController from "../controllers/users";

const router = Router();

//Index Route ---/api
router.get("/", (_, res) => res.send("v18 Bears API"));
router.use("/users", UserController);

export default router;

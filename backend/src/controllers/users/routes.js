import { Router } from "express";
import { getEveryUser, getUser, createUser } from "./controllers";
const router = Router();

router.get("/", getEveryUser);
router.get("/:userName", getUser);
router.post("", createUser);

export default router;

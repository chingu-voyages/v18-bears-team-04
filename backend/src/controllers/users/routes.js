import { Router } from "express";
import { getEveryUser } from "./controllers";
const router = Router();

router.get("/all", getEveryUser);

export default router;

import { Router } from "express";
import { createClass } from "./controllers";
const router = Router();

router.post("", createClass);

export default router;

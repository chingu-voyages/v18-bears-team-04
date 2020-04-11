import { Router } from "express";
import { getEveryUser, registerUserController, loginUserController } from "./controllers";
const router = Router();

router.get("/all", getEveryUser);

router.post("/register", registerUserController)

router.post("/login", loginUserController)

export default router;

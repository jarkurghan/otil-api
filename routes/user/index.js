import { Router } from "express";
import { login } from "./login.js";
import user from "./user.js";
const router = Router();

// token middleware
// check action middleware
router.post("/login", login);
router.post("/", user.create);
router.post("/action", user.add_action);
router.get("/actions", user.get_all_user_action);
router.get("/action/:id", user.get_user_action);
router.get("/action2", user.get_action);

export default router;

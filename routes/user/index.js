import { Router } from "express";
import { login } from "./login.js";
import action from "./action.js";
import user from "./user.js";
const router = Router();

// token middleware
// check action middleware
router.post("/login", login);
router.get("/", user.getUsers);
router.get("/status", user.getStatuses);
router.post("/", user.create);
router.put("/", user.update);
router.get("/action", action.get_all_user_action); //
router.post("/action/add", action.action_add); //
router.delete("/action/del", action.action_del); //
router.get("/actions", action.get_action); //

export default router;

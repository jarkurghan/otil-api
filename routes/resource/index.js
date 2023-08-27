import { Router } from "express";
import resource from "./resource.js";
import action from "../../middleware/actions.js";
const router = Router();

router.get("/", action("WCW"), resource.get_resources);

export default router;

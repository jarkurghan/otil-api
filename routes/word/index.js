import { Router } from "express";
import word from "./word.js";
import action from "../../middleware/actions.js";
const router = Router();

router.post("/", action("WCW"), word.create_word);
router.post("/check", action("WCW"), word.new_word);
router.get("/", action("WCW"), word.get_words);

export default router;

import { Router } from "express";
import word from "./word.js";
import comment from "./comment.js";
import action from "../../middleware/actions.js";
const router = Router();

router.post("/", action("WCW"), word.create_word);
router.post("/full", action("WCW"), word.create_word_full);
router.post("/check", action("WCW"), word.new_word);
router.get("/", action("WCW"), word.get_words);
router.get("/full", action("WCW"), word.get_words_full);
router.get("/:id", action("WCW"), word.get_word_by_id);
router.get("/:id/comment", action("WCW"), comment.get);
router.post("/:id/comment", action("WCW"), comment.create);
router.post("/:id/comment/like", action("WCW"), comment.like);

export default router;

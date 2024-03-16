import { Router } from "express";
import create from "./create.js";
import word from "./word.js";
import update from "./update.js";
import status from "./status.js";
import get from "./get.js";
import comment from "./comment.js";
import action from "../../middleware/actions.js";
const router = Router();

router.get("/list", action("WCW"), get.getWords);
router.get("/list/:id/synonym", action("WCW"), get.getSynonyms);
router.get("/:id/info", action("WCW"), get.getByID);

// router.post("/", action("WCW"), create.create_word);
router.post("/full", action("WCW"), create.create_word_full);
router.post("/check", action("WCW"), create.new_word);

// router.get("/", action("WCW"), word.get_words);
// router.get("/:id", action("WCW"), word.get_word_by_id);

router.get("/:id/comment", action("WCW"), comment.get);
router.post("/:id/comment", action("WCW"), comment.create);
router.post("/:id/comment/like", action("WCW"), comment.like);

router.put("/", action("WCW"), update.update_word);

router.patch("/status/submit", action("WCW"), status.active);
router.delete("/status/delete", action("WCW"), status.delete);

export default router;

import { Router } from "express";
import language from "./language.js";
import action from "../../middleware/actions.js";
const router = Router();

router.get("/", action("WCW"), language.get_languages);
router.get("/type/:id", action("WCW"), language.get_word_types);
router.post("/", action("WCW"), language.add_languages);
router.post("/type", action("WCW"), language.add_word_types);

export default router;

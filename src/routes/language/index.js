import { Router } from "express";
import language from "./language.js";
import action from "../../middleware/actions.js";
const router = Router();

router.get("/", language.get_languages);
router.get("/:id/type", language.get_word_types);
router.post("/", action("Create language"), language.add_language);
router.post("/type", action("Create word type"), language.add_word_types);

export default router;

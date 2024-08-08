import { Router } from "express";
import { search } from "./search.js";
import { wordInfo } from "./wordInfo.js";
const router = Router();

router.get("/search", search);
router.get("/info/:word", wordInfo);

export default router;

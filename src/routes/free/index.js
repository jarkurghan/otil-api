import { Router } from "express";
import { search } from "./search.js";
const router = Router();

router.get("/search", search);

export default router;

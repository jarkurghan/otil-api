import { Router } from "express";
import resource from "./resource.js";
import action from "../../middleware/actions.js";
import auth from "../../middleware/auth.js";
const router = Router();
import multer from "multer";
const upload = multer();
const type = upload.single("file");

router.get("/", auth, action("WCW"), resource.get_resources);
router.post("/", auth, type, resource.add_resource);
router.get("/file/:id", resource.resource_file);

export default router;

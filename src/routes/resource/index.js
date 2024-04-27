import { Router } from "express";
import resource from "./resource.js";
import action from "../../middleware/actions.js";
import auth from "../../middleware/auth.js";
const router = Router();
import multer from "multer";
const upload = multer();
const type = upload.single("file");

router.get("/", auth, resource.get_resources);
router.post("/", auth, action("Create resource"), type, resource.add_resource);
router.get("/file/:id", resource.resource_file);

export default router;

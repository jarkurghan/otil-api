import express from "express";
import user from "./user/index.js";
import word from "./word/index.js";
import resource from "./resource/index.js";
import language from "./language/index.js";
import auth from "../middleware/auth.js";
const app = express();

app.use("/otil/v1/api/user", user);
app.use("/otil/v1/api/word", auth, word);
app.use("/otil/v1/api/resource", auth, resource);
app.use("/otil/v1/api/language", auth, language);

export default app;

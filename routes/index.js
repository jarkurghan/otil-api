import express from "express";
import user from "./user/index.js";
import word from "./word/index.js";
import auth from "../middleware/auth.js";
const app = express();

app.use("/otil/v1/api/user", user);
app.use("/otil/v1/api/word", auth, word);

export default app;

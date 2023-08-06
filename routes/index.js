import express from "express";
import user from "./user/index.js";
const app = express();

app.use("/otil/v1/api/user", user);

export default app;

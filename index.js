import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes/index.js";
import env from "./environment/_env_module.js";

const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
env();

app.use("/", router);
app.listen(process.env.PORT, () => {
  console.log(`Ilova ishga tushdi: http://localhost:${process.env.PORT}`);
});

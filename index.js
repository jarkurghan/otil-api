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
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import options1 from "./tools/swagger_options.js";
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options1)));
// (async () => {
//   console.log(await generate_id());
// })();

app.use("/", router);
app.listen(process.env.PORT, () => {
  console.log(`Ilova ishga tushdi: http://localhost:${process.env.PORT}`);
});

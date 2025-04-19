import express from "express";
import router from "./routes/router";
import config from "./config/config";

const app = express();
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(router);

export default app;

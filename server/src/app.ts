import express from "express";
import router from "./routes/router";

const app = express();
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(router);

export default app;

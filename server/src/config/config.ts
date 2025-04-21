import dotenv from "dotenv";
import Config from "../types/interfaces/config.interface";

dotenv.config({ path: ".env.local" });

const config: Config = {
    port: Number(process.env.PORT) || 8000,
    nodeEnv: process.env.NODE_ENV || "development",
    client: process.env.CLIENT || "http://localhost:5173",
};

export default config;

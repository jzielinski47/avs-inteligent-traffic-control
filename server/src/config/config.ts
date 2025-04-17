import dotenv from "dotenv";
import Config from "../types/interfaces/config.interface";

dotenv.config();

const config: Config = {
    port: Number(process.env.PORT) || 8000,
    nodeEnv: process.env.NODE_ENV || "development",
};

export default config;

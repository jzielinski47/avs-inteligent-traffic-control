import Config from "../types/interfaces/config.interface";

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
import.meta.env.VITE_SOME_KEY;

const config: Config = {
    PORT: import.meta.env.VITE_PORT || 8000,
    SERVER: import.meta.env.VITE_SERVER || "http://localhost",
};

export default config;

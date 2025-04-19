import.meta.env.VITE_SOME_KEY;

interface Config {
    PORT: number;
    SERVER: string;
}

const config: Config = {
    PORT: import.meta.env.VITE_PORT || 8000,
    SERVER: import.meta.env.VITE_SERVER || "http://localhost",
};

export default config;

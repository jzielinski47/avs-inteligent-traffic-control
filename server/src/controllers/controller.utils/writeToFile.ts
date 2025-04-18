import Output from "../../types/interfaces/output.interface";

const fs = require("node:fs");

const writeToFile = (outputPath: string, content: Output) => {
    try {
        fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default writeToFile;

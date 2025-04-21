import { output } from "./config/config";
import processSteps from "./services/processSteps";
import validateJson from "./utils/validateJson";
import writeToFile from "./utils/writeToFile";

const fs = require("node:fs");

const inputPath = process.argv[2];
const outputPath = process.argv[3];

try {
    validateJson(inputPath, outputPath);
} catch (e) {
    e instanceof Error ? console.error("Error", e.message) : null;
    process.exit(1);
}

function main(inputPath: string, outputPath: string) {
    const input = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
    const steps = input.commands;

    writeToFile(outputPath, processSteps(steps));
    console.log(`See ${outputPath} for the results of simulation.`);
}

main(inputPath, outputPath);
export default main;

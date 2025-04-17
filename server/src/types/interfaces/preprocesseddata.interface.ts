import Command from "./command.interface";
import Output from "./output.interface";

interface PreProcessedData {
    steps: Command[];
    stages?: {
        before?: {};
        runtime?: {};
        after?: {};
    };
    output: Output;
}

export default PreProcessedData;

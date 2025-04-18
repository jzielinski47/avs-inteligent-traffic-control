import Command from "./command.interface";
import Output from "./output.interface";

interface PreProcessedData {
    steps: Command[];
    stages?: {
        before?: {};
        runtime?: {};
        after?: {};
    };
   
}

export default PreProcessedData;

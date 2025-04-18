import Command from "./command.interface";
import { Environment } from "./environment.interface";

interface RuntimeMemory {
    steps: Command[];
    stages?: {
        before?: Environment[];
        runtime?: Environment[];
        after?: Environment[];
    };
}

export default RuntimeMemory;

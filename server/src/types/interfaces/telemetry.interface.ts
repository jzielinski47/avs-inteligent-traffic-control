import Command from "./command.interface";
import { Environment } from "./environment.interface";
import Stats from "./stats.interface";

interface Telemetry {
    id: number;
    command: Command;
    stats: Stats;
    before?: Environment;
    runtime?: Environment;
    after?: Environment;
}

export default Telemetry;

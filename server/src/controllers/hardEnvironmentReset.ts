import { directionNames, environment, importedSteps, output, telemetry } from "../models/model";
import { Lights } from "../types/enums/light.enum";

const hardEnvironmentReset = () => {
    for (const dir of directionNames) {
        environment[dir].queue = [];
        environment[dir].priorityLeftSignalLight = Lights.RED;
        environment[dir].straightRightSignalLight = Lights.RED;
    }

    telemetry.length = 0;
    importedSteps.length = 0;
    output.stepStatuses = [];
};

export default hardEnvironmentReset;

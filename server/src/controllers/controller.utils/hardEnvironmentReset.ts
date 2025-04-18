import { directionNames, environment, output } from "../../models/model";
import { Lights } from "../../types/enums/light.enum";

const hardEnvironmentReset = () => {
    for (const dir of directionNames) {
        environment[dir].queue = [];
        environment[dir].priorityLeftSignalLight = Lights.RED;
        environment[dir].straightRightSignalLight = Lights.RED;
    }

    output.stepStatuses = [];
};

export default hardEnvironmentReset;

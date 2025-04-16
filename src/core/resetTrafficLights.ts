import { directionNames, environment } from "../setup";
import { Light } from "../types/enums/light.enum";

export const resetTrafficLights = () => {
    for (const dir of directionNames) {
        const state = environment[dir];
        state.priorityLeftSignalLight = Light.RED;
        state.straightRightSignalLight = Light.RED;
    }
};

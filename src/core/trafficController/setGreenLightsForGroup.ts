import { routeGroups, environment } from "../../setup";
import { Light } from "../../types/enums/light.enum";
import { Manoeuvres } from "../../types/enums/manoeuvres.enum";

const setGreenLightsForGroup = (id: number, selectedManoeuvre: Manoeuvres) => {
    const group = routeGroups[id as number];
    group.forEach((route) => {
        const lightType =
            selectedManoeuvre === Manoeuvres.LEFTTURN ? "priorityLeftSignalLight" : "straightRightSignalLight";

        environment[route.startRoad][lightType] = Light.GREEN;
    });
};

export default setGreenLightsForGroup;

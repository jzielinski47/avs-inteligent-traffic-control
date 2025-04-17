import { directionNames, environment, routeGroups } from "../setup";
import { Light } from "../types/enums/light.enum";
import { Manoeuvres } from "../types/enums/manoeuvres.enum";
import { routeGroupDTO } from "../types/interfaces/routeGroupDTO.interface";
import { Vehicle } from "../types/interfaces/vehicle.interface";

export const setGreenLightsForGroup = (id: number, selectedManoeuvre: Manoeuvres) => {
    const group = routeGroups[id as number];
    group.forEach((route) => {
        const lightType =
            selectedManoeuvre === Manoeuvres.LEFTTURN ? "priorityLeftSignalLight" : "straightRightSignalLight";

        environment[route.startRoad][lightType] = Light.GREEN;
    });
};

export const assignMatchingRouteGroup = (priorityVehicle: Vehicle | null, dataSet: routeGroupDTO) => {
    routeGroups.forEach((group, groupId) => {
        group.forEach((route) => {
            if (route.startRoad === priorityVehicle?.startRoad && route.endRoad === priorityVehicle?.endRoad) {
                dataSet.selectedManoeuvre = priorityVehicle.manoeuvre as Manoeuvres;
                dataSet.selectedGroup = groupId;
            }
        });
    });
};

export const updateTrafficLightsCycle = () => {
    for (const dir of directionNames) {
        const state = environment[dir];
        if (state.priorityLeftSignalLight == Light.GREEN) {
            state.priorityLeftSignalLight = Light.YELLOW;
        }
        if (state.straightRightSignalLight == Light.GREEN) {
            state.straightRightSignalLight = Light.YELLOW;
        }
        if (state.priorityLeftSignalLight == Light.YELLOW) {
            state.priorityLeftSignalLight = Light.RED;
        }
        if (state.straightRightSignalLight == Light.YELLOW) {
            state.straightRightSignalLight = Light.RED;
        }
    }
};

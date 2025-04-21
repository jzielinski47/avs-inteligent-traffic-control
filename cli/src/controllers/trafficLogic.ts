import { directionNames, environment, routePatterns } from "../config/config";
import { Lights } from "../types/enums/light.enum";
import { Manoeuvres } from "../types/enums/manoeuvres.enum";
import { routeGroupDTO } from "../types/interfaces/routeGroupDTO.interface";
import { Vehicle } from "../types/interfaces/vehicle.interface";

export const setGreenLightsForPattern = (id: number, selectedManoeuvre: Manoeuvres) => {
    const pattern = routePatterns[id as number];
    pattern.forEach((route) => {
        const lightType =
            selectedManoeuvre === Manoeuvres.LEFTTURN ? "protectedLeftSignalLight" : "straightRightSignalLight";

        environment[route.startRoad][lightType] = Lights.GREEN;
    });
};

export const assignMatchingRouteGroup = (priorityVehicle: Vehicle | null, dataSet: routeGroupDTO) => {
    routePatterns.forEach((pattern, patternID) => {
        pattern.forEach((route) => {
            if (route.startRoad === priorityVehicle?.startRoad && route.endRoad === priorityVehicle?.endRoad) {
                dataSet.selectedManoeuvre = priorityVehicle.manoeuvre as Manoeuvres;
                dataSet.selectedPattern = patternID;
            }
        });
    });
};

export const updateTrafficLightsCycle = () => {
    for (const dir of directionNames) {
        const state = environment[dir];
        if (state.protectedLeftSignalLight == Lights.GREEN) {
            state.protectedLeftSignalLight = Lights.YELLOW;
        } else if (state.protectedLeftSignalLight == Lights.YELLOW) {
            state.protectedLeftSignalLight = Lights.RED;
        }
        if (state.straightRightSignalLight == Lights.GREEN) {
            state.straightRightSignalLight = Lights.YELLOW;
        } else if (state.straightRightSignalLight == Lights.YELLOW) {
            state.straightRightSignalLight = Lights.RED;
        }
    }
};

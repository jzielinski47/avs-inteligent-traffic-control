import { environment, routeGroups } from "../setup";
import { Light } from "../types/enums/light.enum";
import { Manoeuvres } from "../types/enums/manoeuvres.enum";
import { getLongestWaitingVehicle } from "./assignPriority";
import { resetTrafficLights } from "./resetTrafficLights";

export const trafficController = () => {
    const priorityVehicle = getLongestWaitingVehicle();
    console.log("priority", priorityVehicle);
    let selectedManoeuvre: Manoeuvres;
    let selectedGroup: number;

    routeGroups.forEach((group, groupId) => {
        group.forEach((route) => {
            if (route.startRoad === priorityVehicle?.startRoad && route.endRoad === priorityVehicle?.endRoad) {
                selectedManoeuvre = priorityVehicle.manoeuvre as Manoeuvres;
                selectedGroup = groupId;
            }
        });
    });

    routeGroups.forEach((group, groupId) => {
        group.forEach((route) => {
            environment[route.startRoad][
                selectedManoeuvre == Manoeuvres.LEFTTURN ? "priorityLeftSignalLight" : "straightRightSignalLight"
            ] = Light.GREEN;
        });
    });
};

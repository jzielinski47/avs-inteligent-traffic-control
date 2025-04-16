import { environment, routeGroups } from "../setup";
import { Light } from "../types/enums/light.enum";
import { Manoeuvres } from "../types/enums/manoeuvres.enum";
import { getLongestWaitingVehicle } from "./getLongestWaitingVehicle";

export const trafficController = () => {
    const priorityVehicle = getLongestWaitingVehicle();
    console.log("priority", priorityVehicle);
    routeGroups.forEach((group, groupId) => {
        let selectedManoeuvre: Manoeuvres;
        let selectedGroup: number;
        group.forEach((route) => {
            if (route.startRoad === priorityVehicle?.startRoad && route.endRoad === priorityVehicle?.endRoad) {
                selectedManoeuvre = priorityVehicle.manoeuvre as Manoeuvres;
                selectedGroup = groupId;
            }

            if (groupId == selectedGroup) {
                environment[route.startRoad][
                    selectedManoeuvre == Manoeuvres.LEFTTURN ? "priorityLeftSignalLight" : "straightRightSignalLight"
                ] = Light.GREEN;
            }
        });
    });
};

import { environment, routeGroups } from "../setup";
import { Light } from "../types/enums/light.enum";
import { Manoeuvres } from "../types/enums/manoeuvres.enum";
import { getLongestWaitingVehicle } from "./assignPriority";
import { resetTrafficLights } from "./resetTrafficLights";

export const trafficController = () => {
    const priorityVehicle = getLongestWaitingVehicle();
    console.log("priority", priorityVehicle);
    let selectedManoeuvre: Manoeuvres | undefined;
    let selectedGroup: number | undefined;

    routeGroups.forEach((group, groupId) => {
        group.forEach((route) => {
            if (route.startRoad === priorityVehicle?.startRoad && route.endRoad === priorityVehicle?.endRoad) {
                selectedManoeuvre = priorityVehicle.manoeuvre as Manoeuvres;
                selectedGroup = groupId;
                console.log("selecting " + selectedGroup + " when examining " + priorityVehicle.vehicleId);
            }
        });
    });

    if (selectedGroup != undefined) {
        const group = routeGroups[selectedGroup as number];
        group.forEach((route) => {
            const lightType =
                selectedManoeuvre === Manoeuvres.LEFTTURN ? "priorityLeftSignalLight" : "straightRightSignalLight";

            environment[route.startRoad][lightType] = Light.GREEN;
        });
    }
};

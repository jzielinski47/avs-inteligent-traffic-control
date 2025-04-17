import { routeGroupDTO } from "../../types/interfaces/routeGroupDTO.interface";
import { getPriorityVehicle } from "./assignPriority";
import { assignMatchingRouteGroup, setGreenLightsForPattern } from "./trafficLogic";


export const trafficController = () => {
    const priorityVehicle = getPriorityVehicle();
    console.log("priority", priorityVehicle);

    const dataSet: routeGroupDTO = {};

    assignMatchingRouteGroup(priorityVehicle, dataSet);

    if (dataSet.selectedPattern != undefined && dataSet.selectedManoeuvre != undefined)
        setGreenLightsForPattern(dataSet.selectedPattern, dataSet.selectedManoeuvre);
};

import { routeGroupDTO } from "../types/interfaces/routeGroupDTO.interface";
import { Vehicle } from "../types/interfaces/vehicle.interface";
import { getPriorityVehicle } from "../utils/assignPriority";
import { assignMatchingRouteGroup, setGreenLightsForPattern } from "./trafficLogic";

export const trafficController = () => {
    
    const priorityVehicle = getPriorityVehicle();
    console.log("priority assigned to ", priorityVehicle);

    const dataSet: routeGroupDTO = {};

    assignMatchingRouteGroup(priorityVehicle, dataSet);

    if (dataSet.selectedPattern != undefined && dataSet.selectedManoeuvre != undefined)
        setGreenLightsForPattern(dataSet.selectedPattern, dataSet.selectedManoeuvre);
};

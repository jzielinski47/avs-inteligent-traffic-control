import { routeGroupDTO } from "../../types/interfaces/routeGroupDTO.interface";
import { getPriorityVehicle } from "../../utils/assignPriority";
import assignMatchingRouteGroup from "./getMatchingRouteGroup";
import setGreenLightsForGroup from "./setGreenLightsForGroup";

export const trafficController = () => {
    const priorityVehicle = getPriorityVehicle();
    console.log("priority", priorityVehicle);

    const dataSet: routeGroupDTO = {};

    assignMatchingRouteGroup(priorityVehicle, dataSet);

    if (dataSet.selectedGroup != undefined && dataSet.selectedManoeuvre != undefined)
        setGreenLightsForGroup(dataSet.selectedGroup, dataSet.selectedManoeuvre);
};

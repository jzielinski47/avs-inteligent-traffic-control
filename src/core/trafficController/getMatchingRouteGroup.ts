import { routeGroups } from "../../setup";
import { Manoeuvres } from "../../types/enums/manoeuvres.enum";
import { routeGroupDTO } from "../../types/interfaces/routeGroupDTO.interface";
import { Vehicle } from "../../types/interfaces/vehicle.interface";

const assignMatchingRouteGroup = (priorityVehicle: Vehicle | null, dataSet: routeGroupDTO) => {
    routeGroups.forEach((group, groupId) => {
        group.forEach((route) => {
            if (route.startRoad === priorityVehicle?.startRoad && route.endRoad === priorityVehicle?.endRoad) {
                dataSet.selectedManoeuvre = priorityVehicle.manoeuvre as Manoeuvres;
                dataSet.selectedGroup = groupId;
            }
        });
    });
};

export default assignMatchingRouteGroup;

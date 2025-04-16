import { routeGroups } from "../setup";
import { Vehicle } from "../types/interfaces/vehicle.interface";

const assignManoeuvre = (tempVehicle: Vehicle) => {
    routeGroups.forEach((group) => {
        group.forEach((route) => {
            if (route.startRoad === tempVehicle.startRoad && route.endRoad === tempVehicle.endRoad) {
                tempVehicle.manoeuvre = route.type;
            }
        });
    });
};

export default assignManoeuvre;

import { directionNames, environment } from "../setup";
import { Light } from "../types/enums/light.enum";
import { Manoeuvres } from "../types/enums/manoeuvres.enum";

export const handleVehicleMovement = (leftVehicles: string[]) => {
    for (const dir of directionNames) {
        const state = environment[dir];
        if (state.queue.length > 0) {
            if (
                (state.queue[0].manoeuvre == Manoeuvres.LEFTTURN && state.priorityLeftSignalLight == Light.GREEN) ||
                (state.queue[0].manoeuvre == Manoeuvres.STRAIGHT && state.straightRightSignalLight == Light.GREEN) ||
                (state.queue[0].manoeuvre == Manoeuvres.RIGHTTURN && state.straightRightSignalLight == Light.GREEN) ||
                state.queue[0].isEmergencyVehicle
            ) {
                console.log(state.queue[0].vehicleId + " leaves the crossroad! ");
                leftVehicles.push(state.queue[0].vehicleId);
                state.queue.shift();
            }
        }
    }
};

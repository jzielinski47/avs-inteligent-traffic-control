import { directionNames, environment } from "../config/config";
import { Lights } from "../types/enums/light.enum";
import { Manoeuvres } from "../types/enums/manoeuvres.enum";
import { Vehicle } from "../types/interfaces/vehicle.interface";

export const handleVehicleMovement = (leftVehicles: string[]) => {
    for (const dir of directionNames) {
        const state = environment[dir];
        if (state.queue.length === 0) continue;
        const isGreenLight: boolean =
            (state.queue[0].manoeuvre == Manoeuvres.LEFTTURN && state.protectedLeftSignalLight == Lights.GREEN) ||
            (state.queue[0].manoeuvre == Manoeuvres.STRAIGHT && state.straightRightSignalLight == Lights.GREEN) ||
            (state.queue[0].manoeuvre == Manoeuvres.RIGHTTURN && state.straightRightSignalLight == Lights.GREEN);

        if (state.queue[0].isEmergencyVehicle || isGreenLight) {
            leftVehicles.push(state.queue[0].vehicleId);
            console.log(state.queue[0].vehicleId + "'s leaving the intersection!");
            state.queue.shift();
        }
    }
};

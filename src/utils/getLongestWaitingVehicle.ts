import { directionNames, environment } from "../setup";
import { Vehicle } from "../types/interfaces/vehicle.interface";

export const getLongestWaitingVehicle = (): Vehicle | null => {
    let longestWaitTimeIndex = 0;
    let longestWaitTimeVeh: Vehicle | null = null;

    for (const dir of directionNames) {
        const state = environment[dir];

        if (state.queue.length > 0) {
            if (state.queue[0].waitTime > longestWaitTimeIndex) {
                longestWaitTimeIndex = state.queue[0].waitTime;
                longestWaitTimeVeh = state.queue[0];
            }
        }
    }

    return longestWaitTimeVeh;
};

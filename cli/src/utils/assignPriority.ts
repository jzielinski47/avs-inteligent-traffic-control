import { directionNames, environment } from "../config/config";
import { Vehicle } from "../types/interfaces/vehicle.interface";

export const getPriorityVehicle = (): Vehicle | null => {
    let longestWaitTimeIndex = 0;
    let longestWaitTimeVehicle: Vehicle | null = null;

    for (const dir of directionNames) {
        const state = environment[dir];

        if (state.queue.length > 0) {
            const emergency = state.queue.find((vehicle) => vehicle.isEmergencyVehicle);
            if (emergency) return emergency;

            const [frontVehicle] = state.queue;
            if (frontVehicle.waitTime > longestWaitTimeIndex) {
                longestWaitTimeIndex = frontVehicle.waitTime;
                longestWaitTimeVehicle = frontVehicle;
            }
        }
    }

    return longestWaitTimeVehicle;
};

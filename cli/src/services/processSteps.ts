import { environment, output, directionNames } from "../config/config";
import { updateTrafficLightsCycle } from "../controllers/trafficLogic";
import { trafficController as runTrafficController } from "../controllers/trafficController";
import { Commands } from "../types/enums/command.enum";
import { Command } from "../types/interfaces/command.interface";
import { Vehicle } from "../types/interfaces/vehicle.interface";
import { Road } from "../types/road.type";
import assignManoeuvre from "../utils/assignManoeuvre";
import { handleVehicleMovement } from "./handleVehicleMovement";
import Output from "../types/interfaces/output.interface";
import { getPriorityVehicle } from "../utils/assignPriority";

const processSteps = (steps: Command[]): Output => {
    steps.forEach((step: Command, index: number) => {
        const command: Commands | string = step.type;
        console.log(index, command, environment);
        switch (command) {
            case Commands.ADDVEHICLE:
                const { vehicleId, startRoad, endRoad } = step;
                if (!vehicleId || !startRoad || !endRoad) break;

                const tempVehicle: Vehicle = {
                    vehicleId,
                    startRoad,
                    endRoad,
                    waitTime: 0,
                    isEmergencyVehicle: vehicleId.includes("emergency"),
                };

                assignManoeuvre(tempVehicle);

                environment[startRoad as Road].queue.push(tempVehicle);

                break;
            case Commands.STEP:
                // Updates lights: all YELLOW -> RED;
                updateTrafficLightsCycle();

                const leftVehicles: string[] = [];

                
                runTrafficController();

                console.log(`Step ${index}: queue lengths`, {
                    north: environment.north.queue.length,
                    south: environment.south.queue.length,
                    east: environment.east.queue.length,
                    west: environment.west.queue.length,
                });

                
                handleVehicleMovement(leftVehicles);

                console.log(index, environment);

                output.stepStatuses.push({ leftVehicles });

                // Updates lights: all GREEN -> YELLOW;
                updateTrafficLightsCycle();
                break;
            default:
                console.warn(`Unknown command: ${command}`);
                break;
        }

        for (const dir of directionNames) {
            const state = environment[dir];
            state.queue.forEach((vehicle) => (vehicle.waitTime += 1));
        }
    });

    return output;
};

export default processSteps;

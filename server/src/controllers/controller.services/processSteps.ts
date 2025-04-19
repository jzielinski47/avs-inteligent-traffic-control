import { directionNames, environment, output, telemetry } from "../../models/model";
import { Commands } from "../../types/enums/command.enum";
import Command from "../../types/interfaces/command.interface";
import Output from "../../types/interfaces/output.interface";
import Stats from "../../types/interfaces/stats.interface";
import Telemetry from "../../types/interfaces/telemetry.interface";
import { Vehicle } from "../../types/interfaces/vehicle.interface";
import { Road } from "../../types/road.type";
import { trafficController } from "../controller.controllers/trafficController";
import { updateTrafficLightsCycle } from "../controller.controllers/trafficLogic";
import assignManoeuvre from "../controller.utils/assignManoeuvre";
import { handleVehicleMovement } from "./handleVehicleMovement";

const processSteps = (steps: Command[]): Output => {
    steps.forEach((step: Command, index: number) => {
        const command: Commands | string = step.type;
        console.log(index, command, environment);
        const { north, south, east, west } = environment;
        let queueLengths: Stats = {
            north: north.queue.length,
            south: south.queue.length,
            east: east.queue.length,
            west: west.queue.length,
        };
        const tempTelemetry: Telemetry = { id: index, command: step, stats: queueLengths, leftVehicles: [] };

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

                queueLengths = {
                    north: north.queue.length,
                    south: south.queue.length,
                    east: east.queue.length,
                    west: west.queue.length,
                };
                tempTelemetry.stats = { ...queueLengths };

                break;
            case Commands.STEP:
                // Updates lights: all YELLOW -> RED;
                updateTrafficLightsCycle();

                tempTelemetry.before = JSON.parse(JSON.stringify(environment));

                const leftVehicles: string[] = [];

                trafficController();

                queueLengths = {
                    north: north.queue.length,
                    south: south.queue.length,
                    east: east.queue.length,
                    west: west.queue.length,
                };

                console.log(`Step ${index}: queue lengths`, queueLengths);
                tempTelemetry.stats = { ...queueLengths };

                handleVehicleMovement(leftVehicles);

                console.log(index, environment);
                tempTelemetry.runtime = JSON.parse(JSON.stringify(environment));
                leftVehicles.forEach((v) => tempTelemetry.leftVehicles?.push(v));
                output.stepStatuses.push({ leftVehicles });

                // Updates lights: all GREEN -> YELLOW;
                updateTrafficLightsCycle();
                tempTelemetry.after = JSON.parse(JSON.stringify(environment));
                console.log(environment);

                break;
            default:
                console.warn(`Unknown command: ${command}`);
                break;
        }

        telemetry.push(tempTelemetry);

        for (const dir of directionNames) {
            const state = environment[dir];
            state.queue.forEach((vehicle) => (vehicle.waitTime += 1));
        }
    });

    return output;
};

export default processSteps;

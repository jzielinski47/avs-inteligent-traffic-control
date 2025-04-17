import { trafficController as runTrafficLightsControlSystem } from "./controllers/trafficController";
import { updateTrafficLightsCycle } from "./controllers/trafficLogic";
import { handleVehicleMovement } from "./services/handleVehicleMovement";
import { directionNames, environment, output } from "./setup";
import { Commands } from "./types/enums/command.enum";
import { Command } from "./types/interfaces/command.interface";
import { Vehicle } from "./types/interfaces/vehicle.interface";
import { Road } from "./types/road.type";
import assignManoeuvre from "./utils/assignManoeuvre";
import validateJson from "./utils/validateJson";

const fs = require("node:fs");

const inputPath = process.argv[2];
const outputPath = process.argv[3];

try {
    validateJson(inputPath, outputPath);
} catch (e) {
    e instanceof Error ? console.error("Error", e.message) : null;
    process.exit(1);
}

function main(inputPath: string, outputPath: string) {
    const input = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
    const steps = input.commands;

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

                runTrafficLightsControlSystem();

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

    try {
        fs.writeFileSync(outputPath, JSON.stringify(output));
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main(inputPath, outputPath);
export default main;

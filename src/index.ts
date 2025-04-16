import { handleVehicleMovement } from "./core/handleVehicleMovement";
import { resetTrafficLights } from "./core/resetTrafficLights";
import { trafficController as runTrafficLightsControlSystem } from "./core/trafficController/trafficController";
import { directionNames, environment, output } from "./setup";
import { Command } from "./types/interfaces/command.interface";
import { Vehicle } from "./types/interfaces/vehicle.interface";
import { Road } from "./types/road.type";
import assignManoeuvre from "./utils/assignManoeuvre";
import validateJson from "./utils/validateJson";

const fs = require("node:fs");

function main() {
    const inputPath = process.argv[2];
    const outputPath = process.argv[3];

    try {
        validateJson(process.argv[2], process.argv[3]);
    } catch (e) {
        e instanceof Error ? console.error("Error", e.message) : null;
        process.exit(1);
    }

    const input = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
    const steps = input.commands;

    steps.forEach((step: Command, index: number) => {
        const command: string = step.type;
        console.log(index, command, environment);
        switch (command) {
            case "addVehicle":
                const { vehicleId, startRoad, endRoad } = step; // TODO: validate if startRoad and endRoad map the Direction type
                if (!vehicleId || !startRoad || !endRoad) break;

                const tempVehicle: Vehicle = { vehicleId, startRoad, endRoad, waitTime: 0 };
                (tempVehicle.isEmergencyVehicle as boolean) = vehicleId.includes("emergency");
                assignManoeuvre(tempVehicle);

                environment[startRoad as Road].queue.push(tempVehicle);

                break;
            case "step":
                const leftVehicles: string[] = [];

                runTrafficLightsControlSystem();

                handleVehicleMovement(leftVehicles);

                console.log(index, environment);

                resetTrafficLights();

                output.stepStatuses.push({ leftVehicles });
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

main();
export default main;

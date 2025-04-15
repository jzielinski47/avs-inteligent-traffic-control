import { environment, output } from "./setup";
import { Road } from "./types/road.type";
import { Command } from "./types/interfaces/command.interface";
import { Vehicle } from "./types/interfaces/vehicle.interface";
import { Direction } from "./types/enums/direction.enum";
import { Light } from "./types/enums/light.enum";

const fs = require("node:fs");

const inputPath = process.argv[2];
const outputPath = process.argv[3]; // TODO: Check if the file format is .json, check if the file exists

const input = JSON.parse(fs.readFileSync(inputPath, "utf-8")); // TODO: validate json format
const steps = input.commands;

steps.forEach((step: Command, index: number) => {
    const command: string = step.type;
    switch (command) {
        case "addVehicle":
            const { vehicleId, startRoad, endRoad } = step; // TODO: validate if startRoad and endRoad maps the Direction type
            if (!vehicleId || !startRoad || !endRoad) break;
            const tempVehicle: Vehicle = { vehicleId, startRoad, endRoad, waitTime: 0 };

            environment[startRoad as Road].queue.push(tempVehicle);

            break;
        case "step":
            const directionNames = Object.values(Direction) as Direction[];
            const possibleDiretions = {};
            const leftVehicles: string[] = [];

            // TODO: Inteligentne przypisanie świateł na kierunki

            // TODO: Logika sprawdzenia czy nie ma zielonego na kolidujacych kierunkach

            // TODO: Logika puszczenia samochodu na zielonym na turze
            for (const dir of directionNames) {
                const state = environment[dir];
                if (state.light === Light.GREEN && state.queue.length > 0) {
                    leftVehicles.push(state.queue[0].vehicleId);
                    state.queue.shift();
                }
            }

            output.stepStatuses.push({ leftVehicles });
            break;
    }

    console.log(index, environment);
});

try {
    fs.writeFileSync(outputPath, JSON.stringify(output));
} catch (err) {
    console.error(err);
}

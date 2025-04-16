import { directionNames, environment, output, routeGroups } from "./setup";
import { Light } from "./types/enums/light.enum";
import { Manoeuvres } from "./types/enums/manoeuvres.enum";
import { Command } from "./types/interfaces/command.interface";
import { Vehicle } from "./types/interfaces/vehicle.interface";
import { Road } from "./types/road.type";
import { getLongestWaitingVehicle } from "./utils/getLongestWaitingVehicle";
import { validateJson } from "./utils/validator";

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
        console.log(index, "before", command, environment);
        switch (command) {
            case "addVehicle":
                const { vehicleId, startRoad, endRoad } = step; // TODO: validate if startRoad and endRoad map the Direction type
                if (!vehicleId || !startRoad || !endRoad) break;
                const tempVehicle: Vehicle = { vehicleId, startRoad, endRoad, waitTime: 0 };

                routeGroups.forEach((group) => {
                    group.forEach((route) => {
                        if (route.startRoad === tempVehicle.startRoad && route.endRoad === tempVehicle.endRoad) {
                            tempVehicle.manoeuvre = route.type;
                        }
                    });
                });

                environment[startRoad as Road].queue.push(tempVehicle);

                break;
            case "step":
                const leftVehicles: string[] = [];

                // TODO: Inteligentne przypisanie świateł na kierunki

                // arbitrary for the longest waiting vehicle
                const priorityVehicle = getLongestWaitingVehicle();
                console.log("priority", priorityVehicle);
                routeGroups.forEach((group, groupId) => {
                    let selectedManoeuvre: Manoeuvres;
                    let selectedGroup: number;
                    group.forEach((route) => {
                        if (
                            route.startRoad === priorityVehicle?.startRoad &&
                            route.endRoad === priorityVehicle?.endRoad
                        ) {
                            selectedManoeuvre = priorityVehicle.manoeuvre as Manoeuvres;
                            selectedGroup = groupId;
                        }

                        if (groupId == selectedGroup) {
                            environment[route.startRoad][
                                selectedManoeuvre == Manoeuvres.LEFTTURN
                                    ? "priorityLeftSignalLight"
                                    : "straightRightSignalLight"
                            ] = Light.GREEN;
                        }
                    });
                });

                // TODO: Logika sprawdzenia czy nie ma zielonego na kolidujacych kierunkach

                // TODO: Logika puszczenia samochodu na zielonym na turze
                for (const dir of directionNames) {
                    const state = environment[dir];
                    if (state.queue.length > 0) {
                        if (
                            (state.queue[0].manoeuvre == Manoeuvres.LEFTTURN &&
                                state.priorityLeftSignalLight == Light.GREEN) ||
                            (state.queue[0].manoeuvre == Manoeuvres.STRAIGHT &&
                                state.straightRightSignalLight == Light.GREEN) ||
                            (state.queue[0].manoeuvre == Manoeuvres.RIGHTTURN &&
                                state.straightRightSignalLight == Light.GREEN)
                        ) {
                            console.log(state.queue[0].vehicleId + " opuszcza skrzyzowanie! ");
                            leftVehicles.push(state.queue[0].vehicleId);
                            state.queue.shift();
                        }
                    }
                }

                console.log(index, "after", environment);

                // reset swiatel
                for (const dir of directionNames) {
                    const state = environment[dir];
                    state.priorityLeftSignalLight = Light.RED;
                    state.straightRightSignalLight = Light.RED;
                }

                output.stepStatuses.push({ leftVehicles });
                break;
        }

        // TODO: Zwiekszenie tur oczekiwania samochodu
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

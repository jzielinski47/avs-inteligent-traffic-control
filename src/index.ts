import { environment, output } from "./setup";
import { Road } from "./types/road.type";
import { Command } from "./types/interfaces/command.interface";
import { Vehicle } from "./types/interfaces/vehicle.interface";
import { Direction } from "./types/enums/direction.enum";

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
      const leftVehicles: Vehicle[] = [];
      // TODO: nadawane jest priority dla drog gdzie jest najwiecej samochod
      // TODO: Zastanów się nad różnymi algorytmami dostosowywania świateł (np. opartymi na proporcjach, czasie oczekiwania)

      /*
            tutaj odbywa sie symulacja. Komenda step: wykonuje krok symulacji, 
            podczas którego przez skrzyżowanie przejeżdżają pierwsze pojazdy na drodze,
            która aktualnie ma zielone światło. 

            czyli tak jakby rusza sie pierwsza linia pojazdow czyli kolejka LIFO

            trzeba wziac pod uwage dla kazdego pojazdu gdzie jedzie oraz dac mu odpowiednie swiatlo
            albo sumowac priority. kazdy vehicle bedzie mial czas oczekiwania w rundach ile juz stoi
            planuje zrobic tak ze no najwyzsze priority bedzie mial ten ktory najdluzej stoi i tak
             sie swiatlo odpali ze jak jego swiatlo sie zapali dla jego kierunku to wtedy tez z przeciwnego kierunku sie odpali
      */

      // TODO: nadawanie swiatel

      // TODO: logika ruszania jesli swiatlo zielone
      for (const dir of Object.values(Direction)) {
        const state = environment[dir];

        console.log(state.queue.length, dir, state.light);
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

import Command from "../types/interfaces/command.interface";
import Output from "../types/interfaces/output.interface";
import { Vehicle } from "../types/interfaces/vehicle.interface";
import processSteps from "./controller.services/processSteps";

const runSimulation = (steps: Command[], output: Output) => {
    processSteps(steps);
};

export default runSimulation;
function assignManoeuvre(tempVehicle: Vehicle) {
    throw new Error("Function not implemented.");
}

function updateTrafficLightsCycle() {
    throw new Error("Function not implemented.");
}

function trafficController() {
    throw new Error("Function not implemented.");
}

function handleVehicleMovement(leftVehicles: string[]) {
    throw new Error("Function not implemented.");
}

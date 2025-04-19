import { output } from "../models/model";
import Command from "../types/interfaces/command.interface";
import processSteps from "./controller.services/processSteps";

const runSimulation = (steps: Command[]) => {
    output.stepStatuses = [];
    return processSteps(steps);
};

export default runSimulation;

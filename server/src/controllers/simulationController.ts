import Command from "../types/interfaces/command.interface";
import processSteps from "./controller.services/processSteps";

const runSimulation = (steps: Command[]) => {
    return processSteps(steps);
};

export default runSimulation;

import { Request, Response, Router } from "express";
import validateReqBody from "../middlewares/validateReqBody";
import { output, runtimeMemory } from "../models/model";
import runSimulation from "../controllers/simulationController";

const simulation = Router();

simulation.get("/", (req: Request, res: Response) => {
    res.status(200);
});

simulation.post("/import", validateReqBody, (req: Request, res: Response) => {
    const input = req.body;
    if (!Array.isArray(input?.commands)) {
        res.status(400).json({ msg: "Invalid format: 'commands' must be an array." });
        return;
    }

    runtimeMemory.steps = input.commands;
    res.status(200).json({ msg: "Successfully imported data." });
});

simulation.post("/simulate", (req: Request, res: Response) => {
    if (!runtimeMemory.steps) {
        res.status(400).json({ msg: "Import the commands first via /api/sim/import endpoint" });
        return;
    }
    res.status(200).json(runSimulation(runtimeMemory.steps));
});

simulation.get("/next", validateReqBody, (req: Request, res: Response) => {
    let index: number = req.body?.stepIndex;
    if (typeof index !== "number") {
        res.status(400).json({ msg: "Invalid step index" });
        return;
    }

    const nextIndex = index++;

    runtimeMemory.steps[nextIndex] != undefined
        ? res.status(200).json(runtimeMemory.steps[nextIndex])
        : res.status(400).json({ msg: "unable to resolve the next step" });
    return;
});

simulation.get("/output", (req: Request, res: Response) => {
    output != undefined && runtimeMemory.steps != undefined
        ? res.status(200).json(output)
        : res.status(400).json({ msg: "import the commands first via /api/sim/import endpoint" });
    return;
});

simulation.get("/steps", (req: Request, res: Response) => {
    runtimeMemory.steps != undefined && runtimeMemory.steps.length > 0
        ? res.status(200).json(runtimeMemory.steps)
        : res.status(400).json({ msg: "Import the commands first via /api/sim/import endpoint" });
    return;
});

export default simulation;

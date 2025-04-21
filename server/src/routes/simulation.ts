import { Request, Response, Router } from "express";
import validateReqBody from "../middlewares/validateReqBody";
import { importedSteps, output, telemetry } from "../models/model";
import runSimulation from "../controllers/simulationController";
import Command from "../types/interfaces/command.interface";
import hardEnvironmentReset from "../controllers/hardEnvironmentReset";

const simulation = Router();

simulation.get("/", (req: Request, res: Response) => {
    res.status(200).json({ msg: "communication is working" });
});

simulation.post("/import", validateReqBody, (req: Request, res: Response) => {
    hardEnvironmentReset();

    const input = req.body;
    if (!Array.isArray(input?.commands)) {
        res.status(400).json({ msg: "Invalid format: 'commands' must be an array." });
        return;
    }

    console.log("recieved input data");
    input.commands.forEach((c: Command) => importedSteps.push(c));

    res.status(200).json({ msg: "Successfully imported data." });
});

simulation.post("/simulate", (req: Request, res: Response) => {
    console.log("run simulation");
    if (!importedSteps) {
        res.status(400).json({ msg: "Import the commands first via /api/sim/import endpoint" });
        return;
    }
    res.status(200).json(runSimulation(importedSteps));
});

simulation.get("/stat/:id", (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    telemetry[id] != undefined
        ? res.status(200).json(telemetry[id])
        : res.status(400).json({ msg: "unable to resolve the next step" });
    return;
});

simulation.get("/output", (req: Request, res: Response) => {
    output != undefined && importedSteps != undefined
        ? res.status(200).json(output)
        : res.status(400).json({ msg: "import the commands first via /api/sim/import endpoint" });
    return;
});

simulation.get("/steps", (req: Request, res: Response) => {
    importedSteps != undefined && importedSteps.length > 0
        ? res.status(200).json(importedSteps)
        : res.status(400).json({ msg: "Import the commands first via /api/sim/import endpoint" });
    return;
});

export default simulation;

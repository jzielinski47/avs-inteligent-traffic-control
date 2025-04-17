import { Router } from "express";
import simulationRoutes from "./simulation";

const router: Router = Router();

router.use("/api/sim", simulationRoutes);

export default router;

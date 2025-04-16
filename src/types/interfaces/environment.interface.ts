import { Light } from "../enums/light.enum";
import { Vehicle } from "./vehicle.interface";

export interface Environment {
    north: Road;
    east: Road;
    south: Road;
    west: Road;
}

interface Road {
    priorityLeftSignalLight: Light;
    straightRightSignalLight: Light;
    queue: Vehicle[];  
}

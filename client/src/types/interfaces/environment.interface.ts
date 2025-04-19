import { Lights } from "../enums/light.enum";
import { Vehicle } from "./vehicle.interface";

export interface Environment {
    north: iRoad;
    east: iRoad;
    south: iRoad;
    west: iRoad;
}

export interface iRoad {
    priorityLeftSignalLight: Lights;
    straightRightSignalLight: Lights;
    queue: Vehicle[];
}

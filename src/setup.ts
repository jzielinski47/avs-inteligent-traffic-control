import { Direction } from "./types/enums/direction.enum";
import { Light } from "./types/enums/light.enum";
import { Environment } from "./types/interfaces/playground.interface";
import { Vehicle } from "./types/interfaces/vehicle.interface";

export const environment: Environment = {
    [Direction.NORTH]: {
        light: Light.GREEN,
        queue: [],
    },
    [Direction.EAST]: {
        light: Light.GREEN,
        queue: [],
    },
    [Direction.SOUTH]: {
        light: Light.GREEN,
        queue: [],
    },
    [Direction.WEST]: {
        light: Light.GREEN,
        queue: [],
    },
};

export const output: { stepStatuses: { leftVehicles: string[] }[] } = {
    stepStatuses: [],
};

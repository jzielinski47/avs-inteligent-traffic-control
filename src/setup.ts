import { Direction } from "./types/enums/direction.enum";
import { Light } from "./types/enums/light.enum";
import { Environment } from "./types/interfaces/playground.interface";
import { Vehicle } from "./types/interfaces/vehicle.interface";

export const environment: Environment = {
  [Direction.NORTH]: {
    light: Light.YELLOW,
    queue: [],
  },
  [Direction.EAST]: {
    light: Light.YELLOW,
    queue: [],
  },
  [Direction.SOUTH]: {
    light: Light.YELLOW,
    queue: [],
  },
  [Direction.WEST]: {
    light: Light.YELLOW,
    queue: [],
  },
};

export const output: { stepStatuses: { leftVehicles: Vehicle[] }[] } = {
  stepStatuses: [],
};

import { Direction } from "./types/enums/direction.enum";
import { Light } from "./types/enums/light.enum";
import { Manoeuvres } from "./types/enums/manoeuvres.enum";
import { Environment } from "./types/interfaces/environment.interface";

const defaultLightSignal: Light = Light.RED;

export const environment: Environment = {
    [Direction.NORTH]: {
        priorityLeftSignalLight: defaultLightSignal,
        straightRightSignalLight: defaultLightSignal,
        queue: [],
    },
    [Direction.EAST]: {
        priorityLeftSignalLight: defaultLightSignal,
        straightRightSignalLight: defaultLightSignal,
        queue: [],
    },
    [Direction.SOUTH]: {
        priorityLeftSignalLight: defaultLightSignal,
        straightRightSignalLight: defaultLightSignal,
        queue: [],
    },
    [Direction.WEST]: {
        priorityLeftSignalLight: defaultLightSignal,
        straightRightSignalLight: defaultLightSignal,
        queue: [],
    },
};

export const output: { stepStatuses: { leftVehicles: string[] }[] } = {
    stepStatuses: [],
};

export const directionNames = Object.values(Direction) as Direction[];

export const routeGroups = [
    [
        { startRoad: Direction.SOUTH, endRoad: Direction.WEST, type: Manoeuvres.LEFTTURN },
        { startRoad: Direction.NORTH, endRoad: Direction.EAST, type: Manoeuvres.LEFTTURN },
    ],
    [
        { startRoad: Direction.SOUTH, endRoad: Direction.EAST, type: Manoeuvres.RIGHTTURN },
        { startRoad: Direction.SOUTH, endRoad: Direction.NORTH, type: Manoeuvres.STRAIGHT },
        { startRoad: Direction.NORTH, endRoad: Direction.WEST, type: Manoeuvres.RIGHTTURN },
        { startRoad: Direction.NORTH, endRoad: Direction.SOUTH, type: Manoeuvres.STRAIGHT },
    ],
    [
        { startRoad: Direction.WEST, endRoad: Direction.NORTH, type: Manoeuvres.LEFTTURN },
        { startRoad: Direction.EAST, endRoad: Direction.SOUTH, type: Manoeuvres.LEFTTURN },
    ],
    [
        { startRoad: Direction.WEST, endRoad: Direction.SOUTH, type: Manoeuvres.RIGHTTURN },
        { startRoad: Direction.WEST, endRoad: Direction.EAST, type: Manoeuvres.STRAIGHT },
        { startRoad: Direction.EAST, endRoad: Direction.NORTH, type: Manoeuvres.RIGHTTURN },
        { startRoad: Direction.EAST, endRoad: Direction.WEST, type: Manoeuvres.STRAIGHT },
    ],
];

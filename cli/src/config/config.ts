import { Directions } from "../types/enums/direction.enum";
import { Lights } from "../types/enums/light.enum";
import { Manoeuvres } from "../types/enums/manoeuvres.enum";
import { Environment } from "../types/interfaces/environment.interface";

const defaultLightSignal: Lights = Lights.RED;

export const environment: Environment = {
    [Directions.NORTH]: {
        priorityLeftSignalLight: defaultLightSignal,
        straightRightSignalLight: defaultLightSignal,
        queue: [],
    },
    [Directions.EAST]: {
        priorityLeftSignalLight: defaultLightSignal,
        straightRightSignalLight: defaultLightSignal,
        queue: [],
    },
    [Directions.SOUTH]: {
        priorityLeftSignalLight: defaultLightSignal,
        straightRightSignalLight: defaultLightSignal,
        queue: [],
    },
    [Directions.WEST]: {
        priorityLeftSignalLight: defaultLightSignal,
        straightRightSignalLight: defaultLightSignal,
        queue: [],
    },
};

export const output: { stepStatuses: { leftVehicles: string[] }[] } = {
    stepStatuses: [],
};

export const directionNames = Object.values(Directions) as Directions[];

export const routePatterns: { startRoad: Directions; endRoad: Directions; type: Manoeuvres }[][] = [
    [
        { startRoad: Directions.SOUTH, endRoad: Directions.WEST, type: Manoeuvres.LEFTTURN },
        { startRoad: Directions.NORTH, endRoad: Directions.EAST, type: Manoeuvres.LEFTTURN },
    ],
    [
        { startRoad: Directions.SOUTH, endRoad: Directions.EAST, type: Manoeuvres.RIGHTTURN },
        { startRoad: Directions.SOUTH, endRoad: Directions.NORTH, type: Manoeuvres.STRAIGHT },
        { startRoad: Directions.NORTH, endRoad: Directions.WEST, type: Manoeuvres.RIGHTTURN },
        { startRoad: Directions.NORTH, endRoad: Directions.SOUTH, type: Manoeuvres.STRAIGHT },
    ],
    [
        { startRoad: Directions.WEST, endRoad: Directions.NORTH, type: Manoeuvres.LEFTTURN },
        { startRoad: Directions.EAST, endRoad: Directions.SOUTH, type: Manoeuvres.LEFTTURN },
    ],
    [
        { startRoad: Directions.WEST, endRoad: Directions.SOUTH, type: Manoeuvres.RIGHTTURN },
        { startRoad: Directions.WEST, endRoad: Directions.EAST, type: Manoeuvres.STRAIGHT },
        { startRoad: Directions.EAST, endRoad: Directions.NORTH, type: Manoeuvres.RIGHTTURN },
        { startRoad: Directions.EAST, endRoad: Directions.WEST, type: Manoeuvres.STRAIGHT },
    ],
];

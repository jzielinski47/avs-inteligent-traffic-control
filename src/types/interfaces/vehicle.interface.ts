import { Manoeuvres } from "../enums/manoeuvres.enum";

export interface Vehicle {
    vehicleId: string;
    startRoad: string;
    endRoad: string;
    waitTime: number;
    manoeuvre?: Manoeuvres
}

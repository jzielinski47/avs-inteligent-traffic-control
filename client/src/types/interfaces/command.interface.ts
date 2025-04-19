interface Command {
    type: string;
    vehicleId?: string;
    startRoad?: string;
    endRoad?: string;
}

export default Command;

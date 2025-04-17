import processSteps from "../src/services/processSteps";
import Output from "../src/types/interfaces/output.interface";

const fs = require("node:fs");

describe("processSteps", () => {
    test("standard-input", () => {
        const scenarioNumber: number = 1;
        const sampleInput: string = `./tests/scenarios/scenario${scenarioNumber}.json`;

        const input = JSON.parse(fs.readFileSync(sampleInput, "utf-8"));
        const output: Output = processSteps(input.commands);

        const expectedOut = {
            stepStatuses: [
                {
                    leftVehicles: ["vehicle2", "vehicle1"],
                },

                {
                    leftVehicles: [],
                },

                {
                    leftVehicles: ["vehicle3"],
                },

                {
                    leftVehicles: ["vehicle4"],
                },
            ],
        };

        expect(output).toEqual(expectedOut);
    });
});

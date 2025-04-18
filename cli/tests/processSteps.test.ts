import processSteps from "../src/services/processSteps";
import Output from "../src/types/interfaces/output.interface";
import hardEnvironmentReset from "../src/utils/hardEnvironmentReset";

const fs = require("node:fs");

describe("processSteps", () => {
    beforeEach(() => {
        jest.resetModules();
        hardEnvironmentReset();
    });

    test("should correctly process a standard traffic scenario", () => {
        const scenarioNumber: number = 1;
        const sampleInput: string = `./tests/mockedInputs/scenario${scenarioNumber}.json`;
        const sampleOutput: string = `./tests/mockedOutputs/scenario${scenarioNumber}.json`;

        const input = JSON.parse(fs.readFileSync(sampleInput, "utf-8"));
        const output: Output = processSteps(input.commands);

        const expectedOut = JSON.parse(fs.readFileSync(sampleOutput, "utf-8"));

        expect(output).toMatchObject(expectedOut);
    });

    test("should handle multiple vehicles approaching from the same direction", () => {
        const scenarioNumber: number = 2;
        const sampleInput: string = `./tests/mockedInputs/scenario${scenarioNumber}.json`;
        const sampleOutput: string = `./tests/mockedOutputs/scenario${scenarioNumber}.json`;

        const input = JSON.parse(fs.readFileSync(sampleInput, "utf-8"));
        const output: Output = processSteps(input.commands);

        const expectedOut = JSON.parse(fs.readFileSync(sampleOutput, "utf-8"));
        console.log(output, expectedOut);
        expect(output).toMatchObject(expectedOut);
    });

    test("should handle multiple vehicles approaching from all directions", () => {
        const scenarioNumber: number = 3;
        const sampleInput: string = `./tests/mockedInputs/scenario${scenarioNumber}.json`;
        const sampleOutput: string = `./tests/mockedOutputs/scenario${scenarioNumber}.json`;

        const input = JSON.parse(fs.readFileSync(sampleInput, "utf-8"));
        const output: Output = processSteps(input.commands);

        const expectedOut = JSON.parse(fs.readFileSync(sampleOutput, "utf-8"));
        console.log(output, expectedOut);
        expect(output).toMatchObject(expectedOut);
    });

    test("should correctly prioritize a single emergency vehicle", () => {
        const scenarioNumber: number = 4;
        const sampleInput: string = `./tests/mockedInputs/scenario${scenarioNumber}.json`;
        const sampleOutput: string = `./tests/mockedOutputs/scenario${scenarioNumber}.json`;

        const input = JSON.parse(fs.readFileSync(sampleInput, "utf-8"));
        const output: Output = processSteps(input.commands);

        const expectedOut = JSON.parse(fs.readFileSync(sampleOutput, "utf-8"));
        console.log(output, expectedOut);
        expect(output).toMatchObject(expectedOut);
    });

    test("should move emergency vehicle to front if not first in queue", () => {
        const scenarioNumber: number = 5;
        const sampleInput: string = `./tests/mockedInputs/scenario${scenarioNumber}.json`;
        const sampleOutput: string = `./tests/mockedOutputs/scenario${scenarioNumber}.json`;

        const input = JSON.parse(fs.readFileSync(sampleInput, "utf-8"));
        const output: Output = processSteps(input.commands);

        const expectedOut = JSON.parse(fs.readFileSync(sampleOutput, "utf-8"));
        console.log(output, expectedOut);
        expect(output).toMatchObject(expectedOut);
    });

    test("should prioritize multiple emergency vehicles by forming a corridor", () => {
        const scenarioNumber: number = 6;
        const sampleInput: string = `./tests/mockedInputs/scenario${scenarioNumber}.json`;
        const sampleOutput: string = `./tests/mockedOutputs/scenario${scenarioNumber}.json`;

        const input = JSON.parse(fs.readFileSync(sampleInput, "utf-8"));
        const output: Output = processSteps(input.commands);

        const expectedOut = JSON.parse(fs.readFileSync(sampleOutput, "utf-8"));
        console.log(output, expectedOut);
        expect(output).toMatchObject(expectedOut);
    });

    test("should handle priority under heavy traffic of 28 vehicles at once", () => {
        const scenarioNumber: number = 7;
        const sampleInput: string = `./tests/mockedInputs/scenario${scenarioNumber}.json`;
        const sampleOutput: string = `./tests/mockedOutputs/scenario${scenarioNumber}.json`;

        const input = JSON.parse(fs.readFileSync(sampleInput, "utf-8"));
        const output: Output = processSteps(input.commands);

        const expectedOut = JSON.parse(fs.readFileSync(sampleOutput, "utf-8"));
        console.log(output, expectedOut);
        expect(output).toMatchObject(expectedOut);
    });

    test("should handle priority under heavy traffic of 28 vehicles in different time", () => {
        const scenarioNumber: number = 8;
        const sampleInput: string = `./tests/mockedInputs/scenario${scenarioNumber}.json`;
        const sampleOutput: string = `./tests/mockedOutputs/scenario${scenarioNumber}.json`;

        const input = JSON.parse(fs.readFileSync(sampleInput, "utf-8"));
        const output: Output = processSteps(input.commands);

        const expectedOut = JSON.parse(fs.readFileSync(sampleOutput, "utf-8"));
        console.log(output, expectedOut);
        expect(output).toMatchObject(expectedOut);
    });
});

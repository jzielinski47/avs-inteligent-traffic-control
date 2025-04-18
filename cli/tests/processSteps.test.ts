import processSteps from "../src/services/processSteps";
import Output from "../src/types/interfaces/output.interface";
import hardEnvironmentReset from "../src/utils/hardEnvironmentReset";

const fs = require("node:fs");

describe("processSteps", () => {
    beforeEach(() => {
        jest.resetModules();
        hardEnvironmentReset();
    });

    test("standard-input", () => {
        const scenarioNumber: number = 1;
        const sampleInput: string = `./tests/mockedInputs/scenario${scenarioNumber}.json`;
        const sampleOutput: string = `./tests/mockedOutputs/scenario${scenarioNumber}.json`;

        const input = JSON.parse(fs.readFileSync(sampleInput, "utf-8"));
        const output: Output = processSteps(input.commands);

        const expectedOut = JSON.parse(fs.readFileSync(sampleOutput, "utf-8"));

        expect(output).toMatchObject(expectedOut);
    });

    test("multiple-vehicles-on-the-same-direction", () => {
        const scenarioNumber: number = 2;
        const sampleInput: string = `./tests/mockedInputs/scenario${scenarioNumber}.json`;
        const sampleOutput: string = `./tests/mockedOutputs/scenario${scenarioNumber}.json`;

        const input = JSON.parse(fs.readFileSync(sampleInput, "utf-8"));
        const output: Output = processSteps(input.commands);

        const expectedOut = JSON.parse(fs.readFileSync(sampleOutput, "utf-8"));
        console.log(output, expectedOut);
        expect(output).toMatchObject(expectedOut);
    });

    test("multiple-vehicles-from-each-direction", () => {
        const scenarioNumber: number = 3;
        const sampleInput: string = `./tests/mockedInputs/scenario${scenarioNumber}.json`;
        const sampleOutput: string = `./tests/mockedOutputs/scenario${scenarioNumber}.json`;

        const input = JSON.parse(fs.readFileSync(sampleInput, "utf-8"));
        const output: Output = processSteps(input.commands);

        const expectedOut = JSON.parse(fs.readFileSync(sampleOutput, "utf-8"));
        console.log(output, expectedOut);
        expect(output).toMatchObject(expectedOut);
    });

    test("emergency-vehicle", () => {
        const scenarioNumber: number = 4;
        const sampleInput: string = `./tests/mockedInputs/scenario${scenarioNumber}.json`;
        const sampleOutput: string = `./tests/mockedOutputs/scenario${scenarioNumber}.json`;

        const input = JSON.parse(fs.readFileSync(sampleInput, "utf-8"));
        const output: Output = processSteps(input.commands);

        const expectedOut = JSON.parse(fs.readFileSync(sampleOutput, "utf-8"));
        console.log(output, expectedOut);
        expect(output).toMatchObject(expectedOut);
    });

    test("emergency-vehicle", () => {
        const scenarioNumber: number = 4;
        const sampleInput: string = `./tests/mockedInputs/scenario${scenarioNumber}.json`;
        const sampleOutput: string = `./tests/mockedOutputs/scenario${scenarioNumber}.json`;

        const input = JSON.parse(fs.readFileSync(sampleInput, "utf-8"));
        const output: Output = processSteps(input.commands);

        const expectedOut = JSON.parse(fs.readFileSync(sampleOutput, "utf-8"));
        console.log(output, expectedOut);
        expect(output).toMatchObject(expectedOut);
    });
});

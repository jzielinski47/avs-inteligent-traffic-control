import validateJson from "../src/utils/validateJson";

describe("validateJson", () => {
    test("valid files", () => {
        expect(() => validateJson("input.json", "output.json")).not.toThrow();
    });
    test("invalid input file", () => {
        expect(() => validateJson("input.txt", "output.json")).toThrow("Both files must be .json files!");
    });
    test("invalid output file", () => {
        expect(() => validateJson("input.json", "output.txt")).toThrow("Both files must be .json files!");
    });
    test("invalid files", () => {
        expect(() => validateJson("input.txt", "output.txt")).toThrow("Both files must be .json files!");
    });
});

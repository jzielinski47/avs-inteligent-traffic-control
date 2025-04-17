import fs from "fs";
import main from "../src/index";

jest.mock("fs");

describe("main()", () => {
    it("should process mocked input.json and produce output without writing files", () => {
        const mockedInput = {
            commands: [
                {
                    type: "addVehicle",
                    vehicleId: "vehicle1",
                    startRoad: "north",
                    endRoad: "south",
                },
                { type: "step" },
            ],
        };

        fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockedInput));
        fs.writeFileSync = jest.fn();

        main("fake/input.json", "fake/output.json");

        expect(fs.readFileSync).toHaveBeenCalledWith("fake/input.json", "utf-8");
        expect(fs.writeFileSync).toHaveBeenCalledWith("fake/output.json", expect.stringContaining('"leftVehicles"'));
    });
});

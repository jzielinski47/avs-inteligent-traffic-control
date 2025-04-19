import { Field, Label, Textarea } from "@headlessui/react";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import HUIButton from "./components/HUIButton";
import InputFile from "./components/InputFile";
import PanelWrapper from "./components/PanelWrapper";
import { getStep, importData, runSimulation } from "./services/simulation";
import Command from "./types/interfaces/command.interface";
import Output from "./types/interfaces/output.interface";
import Telemetry from "./types/interfaces/telemetry.interface";
import DirectionComponent from "./components/DirectionComponent";

const App = () => {
    const [step, setStep] = useState<number>(0);
    const [maxSteps, setMaxSteps] = useState<number>(5);
    const [inputData, setInputData] = useState<Command[]>();
    const [logMessage, setLogMessage] = useState<string>("");
    const [output, setOutput] = useState<Output>();
    const [telemetry, setTelemetry] = useState<Telemetry>();

    const readInputFile = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement & { files: FileList };
        if (target.files[0].type !== "application/json") return;

        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                setInputData(json);
                console.log("Parsed JSON:", json);
                setMaxSteps(json?.commands.length - 1);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        };

        reader.readAsText(target.files[0]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // TODO: let user change the input
    };

    const handleDataImport = async () => {
        const json: { msg: string } = await importData(inputData as Command[]);
        if (json.msg) setLogMessage(json.msg);
    };

    const handleSimulationButton = async () => {
        const json = await runSimulation();
        setOutput(json?.stepStatuses);
    };

    useEffect(() => {
        if (inputData) {
        }
    }, [inputData]);

    const handleNextStep = () => {
        if (step < maxSteps) setStep(step + 1);
    };

    const handlePreviousStep = () => {
        if (step > 0) setStep(step - 1);
    };

    useEffect(() => {
        const fetchStep = async () => {
            const json = await getStep(step);
            setTelemetry(json);
            console.log(json);
        };

        fetchStep();
    }, [output, step]);

    return (
        <div className="app flex p-4 items-center w-full h-full flex-col p-4">
            <Header />
            <div className="w-full h-full grid grid-cols-3 gap-4 mt-2 mb-4">
                <PanelWrapper>
                    <InputFile
                        label={"Upload insert.json"}
                        description="You can either upload it here or enter the relevant json in the textfield below."
                        action={readInputFile}
                        action2={handleDataImport}
                    />
                    <Textarea
                        className={
                            "mt-6 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white" +
                            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                        }
                        rows={28}
                        name="inputDisplay"
                        value={JSON.stringify(inputData, null, 2)}
                        onChange={handleInputChange}
                    />
                    <p className="text-sm/6 text-white/50">
                        Make sure you click the <b>Upload</b> button to send upload the data
                    </p>
                    <p className="text-sm/6 text-[#0f0]/50">{logMessage}</p>
                </PanelWrapper>
                <PanelWrapper>
                    <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
                        <div className="flex flex-col gap-0 w-full h-full justify-center items-center">
                            <HUIButton action={handleSimulationButton}>Simulate</HUIButton>
                        </div>
                        <div className="flex flex-col gap-8 w-full h-full justify-center items-center">
                            <div className="flex w-full h-full items-center flex-col">
                                <p>
                                    Step: <span className="text-primary">{step as React.ReactNode}</span>
                                </p>
                                <div className="flex flex-row gap-2">
                                    <HUIButton action={handlePreviousStep}>Previous step</HUIButton>
                                    <HUIButton action={handleNextStep}>Next step</HUIButton>
                                </div>
                            </div>
                            <Field className="w-full h-full">
                                <Label className="text-sm/6 font-medium text-white">Stats</Label>
                                <p>Command: {telemetry?.command?.type}</p>
                                <p>Queue lenghts before: {JSON.stringify(telemetry?.stats, null, 2)}</p>
                            </Field>
                            {telemetry?.command.type === "step" && (
                                <>
                                    <Field className="w-full h-full">
                                        <Label className="text-sm/6 font-medium text-white">Before</Label>

                                        <div className="grid grid-cols-4 w-full">
                                            {telemetry?.before ? (
                                                <>
                                                    <DirectionComponent
                                                        name="North"
                                                        direction={telemetry?.before?.north}
                                                    />
                                                    <DirectionComponent
                                                        name="East"
                                                        direction={telemetry?.before?.east}
                                                    />
                                                    <DirectionComponent
                                                        name="South"
                                                        direction={telemetry?.before?.south}
                                                    />
                                                    <DirectionComponent
                                                        name="West"
                                                        direction={telemetry?.before?.west}
                                                    />
                                                </>
                                            ) : null}
                                        </div>
                                    </Field>
                                    <Field className="w-full h-full">
                                        <Label className="text-sm/6 font-medium text-white">Runtime</Label>
                                        <div className="grid grid-cols-4 w-full">
                                            {telemetry?.runtime ? (
                                                <>
                                                    <DirectionComponent
                                                        name="North"
                                                        direction={telemetry?.runtime?.north}
                                                    />
                                                    <DirectionComponent
                                                        name="East"
                                                        direction={telemetry?.runtime?.east}
                                                    />
                                                    <DirectionComponent
                                                        name="South"
                                                        direction={telemetry?.runtime?.south}
                                                    />
                                                    <DirectionComponent
                                                        name="West"
                                                        direction={telemetry?.runtime?.west}
                                                    />
                                                </>
                                            ) : null}
                                        </div>
                                        <Textarea
                                            className={
                                                "mt-6 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white" +
                                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                            }
                                            rows={6}
                                            name="inputDisplay"
                                            value={"vehicles that left the intersection: \n" + telemetry?.leftVehicles}
                                        />
                                    </Field>
                                    <Field className="w-full h-full">
                                        <Label className="text-sm/6 font-medium text-white">After</Label>
                                        <div className="grid grid-cols-4 w-full">
                                            {telemetry?.after ? (
                                                <>
                                                    <DirectionComponent
                                                        name="North"
                                                        direction={telemetry?.after?.north}
                                                    />
                                                    <DirectionComponent
                                                        name="East"
                                                        direction={telemetry?.after?.east}
                                                    />
                                                    <DirectionComponent
                                                        name="South"
                                                        direction={telemetry?.after?.south}
                                                    />
                                                    <DirectionComponent
                                                        name="West"
                                                        direction={telemetry?.after?.west}
                                                    />
                                                </>
                                            ) : null}
                                        </div>
                                    </Field>
                                </>
                            )}
                        </div>
                    </div>
                </PanelWrapper>
                <PanelWrapper>
                    <div className="w-full justify-start">
                        <h2 className="text-sm/6 font-medium text-white">Output JSON:</h2>
                        <Textarea
                            className={
                                "mt-2 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white" +
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                            }
                            rows={25}
                            value={JSON.stringify(output, null, 2)}
                            name="inputDisplay"
                            readOnly
                        />
                    </div>
                </PanelWrapper>
            </div>
            <div className="w-full h-32">
                <div className="slidecontainer">
                    <input
                        type="range"
                        value={step}
                        min={0}
                        max={maxSteps}
                        className="w-full h-2 rounded-lg text-primary appearance-none cursor-pointer bg-level-1 [hover]:opacity-1"
                    />
                </div>
            </div>
        </div>
    );
};

export default App;

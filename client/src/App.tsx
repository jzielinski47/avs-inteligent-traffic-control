import { Description, Field, Label, Textarea } from "@headlessui/react";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import HUIButton from "./components/HUIButton";
import InputFile from "./components/InputFile";
import PanelWrapper from "./components/PanelWrapper";
import Command from "./types/interfaces/command.interface";
import { getStep, importData, runSimulation } from "./services/simulation";
import Output from "./types/interfaces/output.interface";
import { Environment } from "vite";
import Telemetry from "./types/interfaces/telemetry.interface";

const App = () => {
    const [step, setStep] = useState<number>(0);
    const [maxSteps, setMaxSteps] = useState<number>(5);
    const [inputData, setInputData] = useState<Command[]>();
    const [isSimulated, setIsSimulated] = useState<boolean>(false);
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
                setMaxSteps(json?.commands.length);
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
            setIsSimulated(true);
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
                                    <HUIButton disabled={!isSimulated} action={handlePreviousStep}>
                                        Previous step
                                    </HUIButton>
                                    <HUIButton disabled={!isSimulated} action={handleNextStep}>
                                        Next step
                                    </HUIButton>
                                </div>
                            </div>
                            <Field className="w-full h-full">
                                <Label>Stats</Label>
                                <p>{JSON.stringify(telemetry?.stats, null, 2)}</p>
                            </Field>
                            <Field className="w-full h-full">
                                <Label>Before</Label>
                                <Textarea
                                    className={
                                        "mt-2 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white" +
                                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                    }
                                    rows={8}
                                    name="inputDisplay"
                                    readOnly
                                    value={JSON.stringify(telemetry?.before, null, 2)}
                                />
                            </Field>
                            <Field className="w-full h-full">
                                <Label>Runtime</Label>
                                <Textarea
                                    className={
                                        "mt-2 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white" +
                                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                    }
                                    rows={8}
                                    name="inputDisplay"
                                    readOnly
                                    value={JSON.stringify(telemetry?.runtime, null, 2)}
                                />
                            </Field>
                            <Field className="w-full h-full">
                                <Label>After</Label>
                                <Textarea
                                    className={
                                        "mt-2 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white" +
                                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                    }
                                    rows={8}
                                    name="inputDisplay"
                                    readOnly
                                    value={JSON.stringify(telemetry?.after, null, 2)}
                                />
                            </Field>
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

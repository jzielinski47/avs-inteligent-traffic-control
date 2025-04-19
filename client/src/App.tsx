import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import HUIButton from "./components/HUIButton";
import InputPanel from "./components/InputPanel";
import PanelWrapper from "./components/PanelWrapper";
import StepNavigator from "./components/StepNavigator";
import { TelemetryDisplay } from "./components/TelemetryDisplay";
import { getStep, importData, runSimulation } from "./services/simulation";
import Command from "./types/interfaces/command.interface";
import Output from "./types/interfaces/output.interface";
import Telemetry from "./types/interfaces/telemetry.interface";
import OutputPanel from "./components/OutputPanel";
import SliderTracker from "./components/SliderTracker";

const App = () => {
    const [step, setStep] = useState<number>(0);
    const [maxSteps, setMaxSteps] = useState<number>(5);
    const [inputData, setInputData] = useState<Command[]>();
    const [logMessage, setLogMessage] = useState<string>("");
    const [output, setOutput] = useState<Output>();
    const [telemetry, setTelemetry] = useState<Telemetry>();
    const [canSimulate, setCanSimulate] = useState<boolean>(false);

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
                setStep(0);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        };

        reader.readAsText(target.files[0]);
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
        if (inputData) setCanSimulate(true);
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
                <InputPanel
                    inputData={inputData as Command[]}
                    readInputFile={readInputFile}
                    handleDataImport={handleDataImport}
                    logMessage={logMessage}
                    canSimulate={canSimulate}
                />
                <PanelWrapper>
                    <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
                        <HUIButton
                            action={handleSimulationButton}
                            className={canSimulate ? "bg-green/35" : "bg-primary"}
                        >
                            Simulate
                        </HUIButton>

                        <div className="flex flex-col gap-8 w-full h-full justify-start">
                            <StepNavigator
                                step={step}
                                handleNextStep={handleNextStep}
                                handlePreviousStep={handlePreviousStep}
                            />
                            <TelemetryDisplay telemetry={telemetry as Telemetry} />
                        </div>
                    </div>
                </PanelWrapper>
                <OutputPanel output={output as Output} />
            </div>
            <SliderTracker step={step} maxSteps={maxSteps} />
        </div>
    );
};

export default App;

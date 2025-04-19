import { Field, Label, Textarea } from "@headlessui/react";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import HUIButton from "./components/HUIButton";
import InputFile from "./components/InputFile";
import PanelWrapper from "./components/PanelWrapper";
import Command from "./types/interfaces/command.interface";

const App = () => {
    const [step, setStep] = useState<number>(0);
    const [maxSteps, setMaxSteps] = useState<number>(12);
    const [inputData, setInputData] = useState<Command[]>();
    const [isActiveSimBut, setIsActiveSimBut] = useState<boolean>(false);

    const readInputFile = (e: React.FormEvent<HTMLInputElement>) => {
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

    useEffect(() => {
        if (inputData) setIsActiveSimBut(true);
    }, [inputData]);

    return (
        <div className="app flex p-4 items-center w-full h-full flex-col p-4">
            <Header />
            <div className="w-full h-full grid grid-cols-3 gap-4 mt-2 mb-4">
                <PanelWrapper>
                    <InputFile
                        label={"Upload insert.json"}
                        description="You can either upload it here or enter the relevant json in the textfield below."
                        action={readInputFile}
                    />
                    <Textarea
                        className={
                            "mt-6 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white" +
                            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                        }
                        rows={28}
                        name="inputDisplay"
                        value={JSON.stringify(inputData, null, 2)}
                    />
                </PanelWrapper>
                <PanelWrapper>
                    <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
                        <div className="flex flex-col gap-0 w-full h-full justify-center items-center">
                            <HUIButton>Simulate</HUIButton>
                        </div>
                        <div className="flex flex-col gap-8 w-full h-full justify-center items-center">
                            <div className="flex w-full h-full items-center flex-col">
                                <p>
                                    Step: <span className="text-primary">{step as React.ReactNode}</span>
                                </p>
                                <div className="flex flex-row gap-2">
                                    <HUIButton>Previous step</HUIButton>
                                    <HUIButton>Next step</HUIButton>
                                </div>
                            </div>
                            <Field className="w-full h-full">
                                <Label>Before</Label>
                                <Textarea
                                    className={
                                        "mt-2 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white" +
                                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                    }
                                    rows={8}
                                    name="inputDisplay"
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
                            name="inputDisplay"
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

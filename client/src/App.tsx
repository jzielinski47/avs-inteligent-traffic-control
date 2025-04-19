import { Field, Label, Textarea } from "@headlessui/react";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import HUIButton from "./components/HUIButton";
import InputFile from "./components/InputFile";
import PanelWrapper from "./components/PanelWrapper";

const App = () => {
    const [step, setStep] = useState<Number>(0);

    return (
        <div className="app flex p-4 items-center w-full h-full flex-col p-4">
            <Header />
            <div className="w-full h-full grid grid-cols-3 gap-4 mt-2 mb-4">
                <PanelWrapper>
                    <InputFile
                        label={"Upload insert.json"}
                        description="You can either upload it here or enter the relevant json in the textfield below."
                        action={() => {}}
                    />
                    <Textarea
                        className={
                            "mt-6 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white" +
                            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                        }
                        rows={28}
                        name="inputDisplay"
                    />
                </PanelWrapper>
                <PanelWrapper>
                    <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
                        <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
                            <HUIButton>Simulate</HUIButton>
                            <HUIButton>Next step</HUIButton>
                        </div>
                        <div className="flex flex-col gap-8 w-full h-full justify-center items-center">
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
                        id="default-range"
                        type="range"
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#1e1e1e]"
                    />
                </div>
            </div>
        </div>
    );
};

export default App;

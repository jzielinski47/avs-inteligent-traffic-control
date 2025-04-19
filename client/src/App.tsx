import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import InputFile from "./components/InputFile";
import PanelWrapper from "./components/PanelWrapper";
import { Button, Textarea } from "@headlessui/react";
import HUIButton from "./components/HUIButton";

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
                        rows={16}
                        name="inputDisplay"
                    />
                </PanelWrapper>
                <PanelWrapper>
                    <HUIButton>Simulate</HUIButton>
                    <HUIButton>Next step</HUIButton>
                </PanelWrapper>
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
                        rows={16}
                        name="inputDisplay"
                    />
                </PanelWrapper>
            </div>
        </div>
    );
};

export default App;

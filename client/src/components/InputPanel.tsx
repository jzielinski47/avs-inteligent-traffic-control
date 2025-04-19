import { Textarea } from "@headlessui/react";
import InputFile from "./InputFile";
import PanelWrapper from "./PanelWrapper";
import Command from "../types/interfaces/command.interface";

interface IInputPanel {
    inputData: Command[];
    readInputFile: (e: React.FormEvent<HTMLInputElement>) => void;
    handleDataImport: () => void;
    logMessage: string;
    canSimulate?: boolean;
}

const InputPanel = ({ inputData, readInputFile, handleDataImport, logMessage, canSimulate }: IInputPanel) => {
    return (
        <PanelWrapper>
            <InputFile
                label={"Upload insert.json"}
                description="You can either upload it here or enter the relevant json in the textfield below."
                action={readInputFile}
                action2={handleDataImport}
                canSim={canSimulate}
            />
            <Textarea
                className={
                    "mt-6 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white" +
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                }
                rows={28}
                name="inputDisplay"
                value={JSON.stringify(inputData, null, 2)}
                readOnly
            />
            <p className="text-sm/6 text-white/50">
                Make sure you click the <b>Upload</b> button to send upload the data
            </p>
            <p className="text-sm/6 text-[#0f0]/50">{logMessage}</p>
        </PanelWrapper>
    );
};

export default InputPanel;

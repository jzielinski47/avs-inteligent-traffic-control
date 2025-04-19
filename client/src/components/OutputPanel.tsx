import { Textarea } from "@headlessui/react";
import Output from "../types/interfaces/output.interface";
import PanelWrapper from "./PanelWrapper";

const OutputPanel = ({ output }: { output: Output }) => {
    return (
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
    );
};

export default OutputPanel;

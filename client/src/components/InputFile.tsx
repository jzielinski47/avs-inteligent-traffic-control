import { Field, Label, Description, Input } from "@headlessui/react";
import HUIButton from "./HUIButton";

interface iInputFile {
    label: string;
    description?: string;
    action: (e: React.FormEvent<HTMLInputElement>) => void;
}

const InputFile = ({ label, description, action }: iInputFile) => {
    return (
        <Field>
            <Label className="text-sm/6 font-medium text-white">{label}</Label>
            {description ? <Description className="text-sm/6 text-white/50">{description}</Description> : null}
            <div className="flex w-full justify-between gap-4">
                <Input
                    name="inputfile"
                    type="file"
                    className="mt-2 w-full inline-flex items-center gap-2 rounded-md bg-[#2c2c2c] py-1.5 px-3 text-sm/6 font-semibold transition-colors duration-300 text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#323232] data-[hover]:cursor-pointer data-[open]:bg-[#2c2c2c] data-[focus]:outline-1 data-[focus]:outline-white"
                    onChange={action}
                    accept="application/json"
                />
                <HUIButton>Upload</HUIButton>
            </div>
        </Field>
    );
};

export default InputFile;

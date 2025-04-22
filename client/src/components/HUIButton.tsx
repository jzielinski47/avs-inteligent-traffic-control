import { Button } from "@headlessui/react";
import ButtonProps from "../types/interfaces/buttonProps.interface";

const HButton = ({ children, disabled = false, action, className = "bg-primary" }: ButtonProps) => {
    return (
        <Button
            className={
                className +
                " mt-2 inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold transition-colors duration-300 text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-level-5 data-[hover]:cursor-pointer data-[open]:bg-level-4 data-[focus]:outline-1 data-[focus]:outline-white transition duration-300"
            }
            onClick={action}
            disabled={disabled}
        >
            {children}
        </Button>
    );
};

export default HButton;

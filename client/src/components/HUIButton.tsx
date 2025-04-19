import { Button } from "@headlessui/react";

interface iButton {
    children?: React.ReactNode;
    disabled?: boolean;
    action?: () => void;
    color?: string;
}

const HUIButton = ({ children, disabled = false, action }: iButton) => {
    return (
        <Button
            className="mt-2 inline-flex items-center gap-2 rounded-md bg-primary py-1.5 px-3 text-sm/6 font-semibold transition-colors duration-300 text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-level-5 data-[hover]:cursor-pointer data-[open]:bg-level-4 data-[focus]:outline-1 data-[focus]:outline-white"
            onClick={action}
            disabled={disabled}
        >
            {children}
        </Button>
    );
};

export default HUIButton;

import { Button } from "@headlessui/react";

const HUIButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <Button className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#2c2c2c] py-1.5 px-3 text-sm/6 font-semibold transition-colors duration-300 text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#323232] data-[hover]:cursor-pointer data-[open]:bg-[#2c2c2c] data-[focus]:outline-1 data-[focus]:outline-white">
            {children}
        </Button>
    );
};

export default HUIButton;

import React from "react";

const PanelWrapper = ({ children }: { children?: React.ReactNode | null }) => {
    return (
        <div className="panel w-full h-full bg-[#242424]/60 rounded-lg p-8 flex flex-col gap-1 items-center justify-center">
            {children}
        </div>
    );
};

export default PanelWrapper;

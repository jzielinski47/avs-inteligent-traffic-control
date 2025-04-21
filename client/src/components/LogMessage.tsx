import React from "react";

const LogMessage = ({ children }: { children: React.ReactNode[] | string | null }) => {
    return <p className="text-sm/6 text-[#0f0]/50 transition duration-500">{children}</p>;
};

export default LogMessage;

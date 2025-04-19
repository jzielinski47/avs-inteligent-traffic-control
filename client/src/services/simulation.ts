import Command from "../types/interfaces/command.interface";

const POSTRequest: RequestInit = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
};

const serverIP = "http://localhost:8000";

export const importData = async (data: Command[]) => {
    try {
        const request: RequestInit = {
            ...POSTRequest,
            body: JSON.stringify(data),
        };
        console.log("sending data to " + `${serverIP}/api/sim/import`);
        const res = await fetch(`${serverIP}/api/sim/import`, request);
        if (res.ok) {
            console.log("ok");
            return res.json();
        } else {
            const err = await res.json();
            console.error(err.error);
            if (err.details) {
                err.details.forEach((error: any) => console.error(error.msg));
                throw new Error(err.details[0].msg);
            } else {
                throw new Error(err.error);
            }
        }
    } catch (err: any) {
        throw new Error(err.message);
    }
};

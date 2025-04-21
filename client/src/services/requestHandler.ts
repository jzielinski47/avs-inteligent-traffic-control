import config from "../config/config";
import Command from "../types/interfaces/command.interface";

const POSTRequest: RequestInit = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
};

const serverURL: string = config.PORT ? `${config.SERVER}:${config.PORT}` : `${config.SERVER}`;

export const importData = async (data: Command[]) => {
    try {
        const request: RequestInit = {
            ...POSTRequest,
            body: JSON.stringify(data),
        };
        console.log("sending data to " + `${serverURL}/api/sim/import`);
        const res = await fetch(`${serverURL}/api/sim/import`, request);
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

export const runSimulation = async () => {
    try {
        const request: RequestInit = {
            ...POSTRequest,
        };
        console.log("sending data to " + `${serverURL}/api/sim/simulate`);
        const res = await fetch(`${serverURL}/api/sim/simulate`, request);
        if (res.ok) {
            console.log("ok");
            return res.json();
        } else {
            const err = await res.json();
            console.error(err);
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

export const getStep = async (i: number) => {
    try {
        const request: RequestInit = {
            method: "GET",
        };
        console.log("sending data to " + `${serverURL}/api/sim/stat/${i}`);
        const res = await fetch(`${serverURL}/api/sim/stat/${i}`, request);
        if (res.ok) {
            console.log("ok");
            return res.json();
        } else {
            const err = await res.json();
            console.error(err);
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

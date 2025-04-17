import { Request, Response, NextFunction } from "express";

const validateReqBody = (req: Request, res: Response, next: NextFunction) => {
    const input = req.body;
    if (!input || typeof input !== "object") {
        res.status(400).json({ msg: "Missing or invalid JSON body." });
    }

    next();
};

export default validateReqBody;

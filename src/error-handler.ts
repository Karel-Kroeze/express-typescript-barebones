import { NextFunction, Response, Request } from "express";
import { createBuilderStatusReporter } from "typescript";

export class HttpException extends Error {
    status: number;
    constructor(message: string, status: number = 404) {
        super(message);
        this.status = status;
    }
}

export const ExceptionHandler = (
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(err.status).json({ err });
};

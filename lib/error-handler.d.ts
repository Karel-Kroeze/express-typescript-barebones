import { NextFunction, Response, Request } from "express";
export declare class HttpException extends Error {
    status: number;
    constructor(message: string, status?: number);
}
export declare const ExceptionHandler: (err: HttpException, req: Request, res: Response, next: NextFunction) => void;

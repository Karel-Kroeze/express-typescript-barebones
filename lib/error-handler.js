"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionHandler = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, status = 404) {
        super(message);
        this.status = status;
    }
}
exports.HttpException = HttpException;
exports.ExceptionHandler = (err, req, res, next) => {
    res.status(err.status).json({ err });
};

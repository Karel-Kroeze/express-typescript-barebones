"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const morgan_1 = __importDefault(require("morgan"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bytes_1 = __importDefault(require("bytes"));
const chalk_1 = __importDefault(require("chalk"));
morgan_1.default.token("prettyStatus", (req, res) => {
    // get the status code if response written
    const status = res.headersSent ? res.statusCode : req.statusCode;
    if (!status)
        return chalk_1.default.grey("-");
    const msg = http_status_codes_1.default.getStatusText(status).padEnd(20).substr(0, 20);
    const paddedStatus = status.toString().padEnd(4).padStart(5);
    if (status >= 500)
        return `${chalk_1.default.bgRed.black(paddedStatus)} ${chalk_1.default.red(msg)}`;
    if (status >= 400)
        return `${chalk_1.default.bgYellow.black(paddedStatus)} ${chalk_1.default.yellow(msg)}`;
    if (status >= 300)
        return `${chalk_1.default.bgCyan.black(paddedStatus)} ${chalk_1.default.cyan(msg)}`;
    if (status >= 200)
        return `${chalk_1.default.bgGreen.black(paddedStatus)} ${chalk_1.default.green(msg)}`;
    return msg;
});
morgan_1.default.token("prettyContentLength", (req, res) => {
    if (!res.headersSent)
        return chalk_1.default.grey("-");
    const length = res.getHeader("content-length");
    if (!length)
        return chalk_1.default.grey("-");
    return bytes_1.default(Number(length));
});
exports.logger = morgan_1.default(":date[iso] :: :prettyStatus :: :remote-addr :method :url :prettyContentLength");

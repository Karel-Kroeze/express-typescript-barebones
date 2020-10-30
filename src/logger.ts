import morgan from "morgan";
import statusCodes from "http-status-codes";
import bytes from "bytes";
import chalk from "chalk";

morgan.token("prettyStatus", (req, res) => {
    // get the status code if response written
    const status = res.headersSent ? res.statusCode : req.statusCode;
    if (!status) return chalk.grey("-");

    const msg = statusCodes.getStatusText(status).padEnd(20).substr(0, 20);
    const paddedStatus = status.toString().padEnd(4).padStart(5);
    if (status >= 500)
        return `${chalk.bgRed.black(paddedStatus)} ${chalk.red(msg)}`;
    if (status >= 400)
        return `${chalk.bgYellow.black(paddedStatus)} ${chalk.yellow(msg)}`;
    if (status >= 300)
        return `${chalk.bgCyan.black(paddedStatus)} ${chalk.cyan(msg)}`;
    if (status >= 200)
        return `${chalk.bgGreen.black(paddedStatus)} ${chalk.green(msg)}`;
    return msg;
});

morgan.token("prettyContentLength", (req, res) => {
    if (!res.headersSent) return chalk.grey("-");
    const length = res.getHeader("content-length");
    if (!length) return chalk.grey("-");

    return bytes(Number(length));
});

export const logger = morgan(
    ":date[iso] :: :prettyStatus :: :remote-addr :method :url :prettyContentLength"
);

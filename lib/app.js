"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// set up .env
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT = 3000, HOST = "localhost", COOKIE_SECRET } = process.env;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = require("./error-handler");
const HelloWorld_1 = require("./routers/HelloWorld");
const logger_1 = require("./logger");
exports.app = express_1.default();
// apply basic middleware
exports.app.use(cors_1.default({ origin: "*" })); // make sure to set origin to something more specific for sensitive API's.
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use(cookie_parser_1.default(COOKIE_SECRET));
exports.app.use(logger_1.logger);
// router skeleton
exports.app.use("/hello", HelloWorld_1.HelloWorldRouter);
// if we got here, we didn't find what we were looking for
exports.app.use((req, res, next) => {
    throw new error_handler_1.HttpException("page not found", 404);
});
exports.app.use(error_handler_1.ExceptionHandler);
const server = exports.app.listen(Number(PORT), HOST, () => {
    const { address, port } = server.address();
    console.log(`server listening on: http://${address}:${port}/hello`);
});

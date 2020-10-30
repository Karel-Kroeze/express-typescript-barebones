// set up .env
import dotenv from "dotenv";
dotenv.config();
const { PORT = 3000, HOST = "localhost", COOKIE_SECRET } = process.env;

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import { ExceptionHandler, HttpException } from "./error-handler";
import { HelloWorldRouter } from "./routers/HelloWorld";
import { logger } from "./logger";

export const app = express();

// apply basic middleware
app.use(cors({ origin: "*" })); // make sure to set origin to something more specific for sensitive API's.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));
app.use(logger);

// router skeleton
app.use("/hello", HelloWorldRouter);

// if we got here, we didn't find what we were looking for
app.use((req, res, next) => {
    throw new HttpException("page not found", 404);
});
app.use(ExceptionHandler);

const server = app.listen(Number(PORT), HOST, () => {
    const { address, port } = server.address() as any;
    console.log(`server listening on: http://${address}:${port}/hello`);
});

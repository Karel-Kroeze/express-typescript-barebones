import { Router } from "express";

export const HelloWorldRouter = Router();
HelloWorldRouter.get("/", async (req, res, next) => {
    res.send("Hello world!");
});

// src/index.js
import express, { Express, Request, Response } from "express";
import { signRouter } from "./router/signature.router";

import db from "./config/database";
const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Healthy");
});

app.use("/signature", signRouter);

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

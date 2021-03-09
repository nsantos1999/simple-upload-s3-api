import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import routes from "@routes/index";
import { IConnection } from "@interfaces/IConnection";
import { MongoDBConnect } from "@configs/MongoDBConnect";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(routes);

setup();

async function setup() {
  console.log("Connecting with all dependencies... Await!");
  await connectDependencies([new MongoDBConnect()]);
  startServer();
}

function startServer() {
  app.listen(3000, () => {
    console.log("Server started!!");
  });
}

async function connectDependencies(connections: IConnection[]) {
  for (const connection of connections) {
    await connection.connect();
  }
}

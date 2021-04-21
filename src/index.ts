import * as dotenv from "dotenv";

dotenv.config();

import express from "express";
import routes from "@routes/index";
import { IConnection } from "@interfaces/IConnection";
import morgan from "morgan";
import cors from "cors";

import { MongoDBConnect } from "@infra/MongoDBConnect";
import { SQSConnect } from "@infra/SQSConnect";
import { CompressImageQueueHandlerProvider } from "@providers/implementations/CompressImageQueueHandlerProvider";
import { SNSSubscribersConnect } from "@infra/SNSSubscribersConnect";
import { CompressImageSnsSubcriber } from "@sns/Subscribers/implementations/CompressImageSnsSubscriber";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(routes);

async function setup() {
  console.log("Connecting with all dependencies... Await!");
  await connectDependencies([
    new MongoDBConnect(),
    new SNSSubscribersConnect([new CompressImageSnsSubcriber()]),
    // new SQSConnect([new CompressImageQueueHandlerProvider()]),
  ]);
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

setup().then(startServer);

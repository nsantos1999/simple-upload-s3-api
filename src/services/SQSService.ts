import aws from "aws-sdk";
import { IQueueHandlerProvider } from "providers/IQueueHandlerProvider";

const sqs = new aws.SQS();

export class SQSService {
  private static instance: SQSService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) this.instance = new SQSService();

    return this.instance;
  }

  startListener(queueHandlerProvider: IQueueHandlerProvider) {
    sqs.receiveMessage(queueHandlerProvider.getQueueParams(), (err, data) => {
      if (err) {
        console.error("SQSError", err);
      } else {
        queueHandlerProvider.handle(data);
      }
    });
  }
}

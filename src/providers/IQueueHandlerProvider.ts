import { SQS } from "aws-sdk";

export interface IQueueHandlerProvider {
  getQueueParams(): SQS.Types.ReceiveMessageRequest;
  handle(data: any): void;
}

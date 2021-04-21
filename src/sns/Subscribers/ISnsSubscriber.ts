import { SNS } from "aws-sdk";

export interface ISnsSubscriber {
  getParams(): SNS.Types.SubscribeInput;
  handle(data: any): void;
}

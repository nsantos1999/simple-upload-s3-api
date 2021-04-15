import { SQS } from "aws-sdk";
import { IQueueHandlerProvider } from "providers/IQueueHandlerProvider";

export class CompressImageQueueHandlerProvider
  implements IQueueHandlerProvider {
  getQueueParams(): SQS.Types.ReceiveMessageRequest {
    return {
      QueueUrl: "compress-image-queue",
    };
  }
  handle(data: any) {
    console.log(data);
  }
}

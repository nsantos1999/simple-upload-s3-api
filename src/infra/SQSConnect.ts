import { IConnection } from "@interfaces/IConnection";
import { CompressImageQueueHandlerProvider } from "@providers/implementations/CompressImageQueueHandlerProvider";
import { IQueueHandlerProvider } from "@providers/IQueueHandlerProvider";
import { SQSService } from "@services/SQSService";

export class SQSConnect implements IConnection {
  constructor(private queueHandlerProviders: IQueueHandlerProvider[]) {}
  async connect(): Promise<void> {
    try {
      this.queueHandlerProviders.forEach((queueHandlerProvider) => {
        SQSService.getInstance().startListener(queueHandlerProvider);
      });

      console.log("SQS Connected!!");
    } catch (err) {
      console.error("SQS - Connection fail.", err);
    }
  }
}

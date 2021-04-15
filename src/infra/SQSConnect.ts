import { IConnection } from "@interfaces/IConnection";
import { CompressImageQueueHandlerProvider } from "@providers/implementations/CompressImageQueueHandlerProvider";
import { SQSService } from "@services/SQSService";

export class SQSConnect implements IConnection {
  async connect(): Promise<void> {
    try {
      SQSService.getInstance().startListener(
        new CompressImageQueueHandlerProvider()
      );

      console.log("SQS Connected!!");
    } catch (err) {
      console.error("SQS - Connection fail.", err);
    }
  }
}

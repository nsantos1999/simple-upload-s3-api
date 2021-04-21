import { IConnection } from "@interfaces/IConnection";
import { CompressImageQueueHandlerProvider } from "@providers/implementations/CompressImageQueueHandlerProvider";
import { IQueueHandlerProvider } from "@providers/IQueueHandlerProvider";
import { SNSService } from "@services/SNSService";
import { ISnsSubscriber } from "@sns/Subscribers/ISnsSubscriber";

export class SNSSubscribersConnect implements IConnection {
  constructor(private snsSubcribers: ISnsSubscriber[]) {}
  async connect(): Promise<void> {
    try {
      await Promise.all(
        this.snsSubcribers.map((snsSubcriber) => {
          return SNSService.getInstance().startSubscriber(snsSubcriber);
        })
      );

      console.log("SNS Connected!!");
    } catch (err) {
      console.error("SNS - Connection fail.", err);
    }
  }
}

import { SNS } from "aws-sdk";
import { ISnsSubscriber } from "../ISnsSubscriber";

export class CompressImageSnsSubcriber implements ISnsSubscriber {
  getParams(): SNS.Types.SubscribeInput {
    return {
      TopicArn: "arn:aws:sns:sa-east-1:518276514603:compress-image-finish",
      Protocol: "http",
    };
  }

  handle(data: any) {
    console.log(data);
  }
}

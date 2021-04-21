import aws from "aws-sdk";
import { ISnsSubscriber } from "@sns/Subscribers/ISnsSubscriber";

aws.config.update({ region: "sa-east-1" });
console.log(aws.config.region);

const sns = new aws.SNS();

export class SNSService {
  private static instance: SNSService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) this.instance = new SNSService();

    return this.instance;
  }

  startSubscriber(snsSubscriber: ISnsSubscriber) {
    return new Promise((resolve, reject) => {
      // sns.subscri
      sns.subscribe(snsSubscriber.getParams(), (err, data) => {
        if (err) {
          console.error("SNSError", err);
          reject(err);
        } else {
          snsSubscriber.handle(data);
          resolve(data);
        }
      });
    });
  }
}

import mongoose, { Document, Schema } from "mongoose";
import aws from "aws-sdk";

const s3 = new aws.S3();

export interface IPost extends Document {
  name: string;
  size: number;
  key: string;
  url: string;
  createdAt?: Date;
}

const PostSchema = new Schema<IPost>({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: { type: Date, default: Date.now },
});

PostSchema.pre("remove", async function () {
  try {
    await s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: this.key,
      })
      .promise();
    console.log("File deleted...");
  } catch (response) {
    console.log(response.status);
  }
});

const Post = mongoose.model<IPost>("Post", PostSchema);

export { Post };

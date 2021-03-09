import mongoose, { Document, Schema } from "mongoose";

export interface IFile extends Document {
  name: string;
  size: number;
  key: string;
  url: string;
  createdAt?: Date;
}

const FileSchema = new Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: { type: Date, default: Date.now },
});

const File = mongoose.model<IFile>("File", FileSchema);

export { File };

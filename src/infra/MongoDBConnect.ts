import { IConnection } from "@interfaces/IConnection";
import mongoose from "mongoose";

export class MongoDBConnect implements IConnection {
  async connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGODB_STRING_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("MongoDB Connected!!");
    } catch (err) {
      console.error("Mongoose - Connection fail.", err);
    }
  }
}

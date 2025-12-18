import mongoose from "mongoose";
import { env } from "./env";

export const connectMongo = async (): Promise<void> => {
  await mongoose.connect(env.mongoUri);
  console.log("MongoDB connected");
};

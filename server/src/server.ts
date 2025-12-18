import { buildApp } from "./app";
import { connectMongo } from "./config/mongo";
import { env } from "./config/env";

const start = async () => {
  await connectMongo();

  const app = buildApp();

  await app.listen({ port: env.port, host: "0.0.0.0" });
  console.log(`Server running on port ${env.port}`);
};

start();

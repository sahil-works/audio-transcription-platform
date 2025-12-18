import Fastify from "fastify";
import cors from "@fastify/cors";
import { transcriptionRoutes } from "./modules/transcription/transcription.routes";
import { errorHandler } from "./middlewares/error.middleware";

export const buildApp = () => {
  const app = Fastify({ logger: true });

  app.register(cors, {
    origin: true,
  });

  app.register(transcriptionRoutes, { prefix: "/api" });
  app.setErrorHandler(errorHandler);

  return app;
};

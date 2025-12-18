import { FastifyInstance } from "fastify";
import {
  createTranscription,
  createAzureTranscription,
  getTranscriptions,
} from "./transcription.controller";

export const transcriptionRoutes = async (app: FastifyInstance) => {
  app.post("/transcription", createTranscription);
  app.post("/azure-transcription", createAzureTranscription);
  app.get("/transcriptions", getTranscriptions);
};

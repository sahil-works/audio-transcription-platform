import { FastifyRequest, FastifyReply } from "fastify";
import { TranscriptionService } from "./transcription.service";

const service = new TranscriptionService();

export const createTranscription = async (
  request: FastifyRequest<{ Body: { audioUrl: string } }>,
  reply: FastifyReply
) => {
  const { audioUrl } = request.body;

  if (!audioUrl) {
    return reply.status(400).send({ message: "audioUrl is required" });
  }

  const record = await service.createMockTranscription(audioUrl);
  reply.status(201).send({ id: record._id });
};

export const createAzureTranscription = async (
  request: FastifyRequest<{ Body: { audioUrl: string; language?: string } }>,
  reply: FastifyReply
) => {
  const { audioUrl, language } = request.body;

  if (!audioUrl) {
    return reply.status(400).send({ message: "audioUrl is required" });
  }

  const record = await service.createAzureTranscription(audioUrl, language);
  reply.status(201).send({ id: record._id });
};

export const getTranscriptions = async (
  request: FastifyRequest<{ Querystring: { page?: number; limit?: number } }>,
  reply: FastifyReply
) => {
  const page = Number(request.query.page) || 1;
  const limit = Number(request.query.limit) || 10;

  const result = await service.getRecentTranscriptions(limit, page);

  reply.send({
    data: result.data,
    meta: {
      page,
      limit,
      total: result.total,
    },
  });
};

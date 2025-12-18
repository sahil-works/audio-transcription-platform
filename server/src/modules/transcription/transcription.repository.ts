import { TranscriptionModel } from "./transcription.model";

export class TranscriptionRepository {
  create(data: {
    audioUrl: string;
    transcription: string;
    source?: "mock" | "azure";
  }) {
    return TranscriptionModel.create(data);
  }

  async findLast30Days(limit: number, page: number) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      TranscriptionModel.find({
        createdAt: { $gte: thirtyDaysAgo },
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      TranscriptionModel.countDocuments({
        createdAt: { $gte: thirtyDaysAgo },
      }),
    ]);

    return {
      data,
      total,
    };
  }
}

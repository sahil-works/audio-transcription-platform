import { TranscriptionRepository } from "./transcription.repository";
import { retry } from "../../utils/retry";
import { AzureSpeechProvider } from "./azure.provider";

export class TranscriptionService {
  private repo = new TranscriptionRepository();
  private azureProvider = new AzureSpeechProvider();

  async createMockTranscription(audioUrl: string) {
    await retry(async () => {
      if (!audioUrl.startsWith("http")) {
        throw new Error("Invalid audio URL");
      }
    });

    return this.repo.create({
      audioUrl,
      transcription: "transcribed text",
      source: "mock",
    });
  }

  async createAzureTranscription(audioUrl: string, language?: string) {
    const transcription = await retry(() =>
      this.azureProvider.transcribe(audioUrl, language)
    );

    return this.repo.create({
      audioUrl,
      transcription,
      source: "azure",
    });
  }

  async getRecentTranscriptions(limit: number, page: number) {
    return this.repo.findLast30Days(limit, page);
  }
}

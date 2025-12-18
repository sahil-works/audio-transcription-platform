export interface CreateTranscriptionDTO {
  audioUrl: string;
}

export interface TranscriptionEntity {
  audioUrl: string;
  transcription: string;
  source: "mock" | "azure";
  createdAt: Date;
}

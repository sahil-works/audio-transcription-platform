import { Schema, model } from "mongoose";

const TranscriptionSchema = new Schema(
  {
    audioUrl: { type: String, required: true },
    transcription: { type: String, required: true },
    source: { type: String, enum: ["mock", "azure"], default: "mock" },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

// Index for last-30-days query
TranscriptionSchema.index({ createdAt: -1 });

export const TranscriptionModel = model("Transcription", TranscriptionSchema);

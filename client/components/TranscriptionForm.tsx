"use client";

import { useState } from "react";
import {
  createMockTranscription,
  createAzureTranscription,
} from "../services/api";

export default function TranscriptionForm() {
  const [audioUrl, setAudioUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (type: "mock" | "azure") => {
    if (!audioUrl) {
      alert("Please enter audio URL");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res =
        type === "mock"
          ? await createMockTranscription(audioUrl)
          : await createAzureTranscription(audioUrl, "en-US");

      setResult(res.id);
    } catch {
      alert("Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create Transcription</h2>

      <input
        placeholder="https://example.com/audio.mp3"
        value={audioUrl}
        onChange={(e) => setAudioUrl(e.target.value)}
      />

      <div>
        <button onClick={() => handleSubmit("mock")} disabled={loading}>
          Mock Transcription
        </button>

        <button
          className="secondary"
          onClick={() => handleSubmit("azure")}
          disabled={loading}
        >
          Azure Transcription
        </button>
      </div>

      {result && <p>Created Transcription ID: {result}</p>}
    </div>
  );
}

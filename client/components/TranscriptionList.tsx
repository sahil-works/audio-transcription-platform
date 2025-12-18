"use client";

import { useEffect, useState } from "react";
import { fetchTranscriptions } from "../services/api";
import { Transcription } from "../types/transcription";

export default function TranscriptionList() {
  const [items, setItems] = useState<Transcription[]>([]);

  useEffect(() => {
    fetchTranscriptions().then((res) => setItems(res.data));
  }, []);

  return (
    <div>
      <h2>Recent Transcriptions</h2>

      {items.length === 0 && <p>No transcriptions yet.</p>}

      {items.map((item) => (
        <div key={item._id} className="card">
          <p>
            <strong>Source:</strong> {item.source}
          </p>
          <p>
            <strong>Text:</strong> {item.transcription}
          </p>
          <p style={{ fontSize: 12, opacity: 0.6 }}>
            {new Date(item.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export const createMockTranscription = async (audioUrl: string) => {
  const res = await fetch(`${BASE_URL}/transcription`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ audioUrl }),
  });

  if (!res.ok) {
    throw new Error("Failed to create transcription");
  }

  return res.json();
};

export const createAzureTranscription = async (
  audioUrl: string,
  language?: string
) => {
  const res = await fetch(`${BASE_URL}/azure-transcription`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ audioUrl, language }),
  });

  if (!res.ok) {
    throw new Error("Failed to create Azure transcription");
  }

  return res.json();
};

export const fetchTranscriptions = async () => {
  const res = await fetch(`${BASE_URL}/transcriptions`);

  if (!res.ok) {
    throw new Error("Failed to fetch transcriptions");
  }

  return res.json();
};

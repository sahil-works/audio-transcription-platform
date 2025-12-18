export class AzureSpeechProvider {
  async transcribe(audioUrl: string, language = "en-US"): Promise<string> {
    // MOCKED IMPLEMENTATION
    // Real Azure SDK would be used here

    if (!audioUrl.startsWith("http")) {
      throw new Error("Invalid audio URL");
    }

    // Simulate API latency
    await new Promise((res) => setTimeout(res, 300));

    return `azure transcribed text (${language})`;
  }
}

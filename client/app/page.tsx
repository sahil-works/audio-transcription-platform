import TranscriptionForm from "../components/TranscriptionForm";
import TranscriptionList from "../components/TranscriptionList";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Audio Transcription Demo</h1>
      <TranscriptionForm />
      <hr />
      <TranscriptionList />
    </main>
  );
}

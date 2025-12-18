# Audio Transcription Service

A production-style Node.js + TypeScript backend service that accepts audio URLs, performs mocked or Azure-based transcription, and stores results in MongoDB.

This project is designed to demonstrate backend architecture, clean code structure, MongoDB usage, API integrations, and scalability thinking.

---

## Tech Stack

- Node.js + TypeScript (strict mode)
- Fastify (HTTP framework)
- MongoDB + Mongoose
- Jest (testing)
- Azure Speech-to-Text (stubbed integration)

---

## Project Structure

src/
├── app.ts # Fastify app setup
├── server.ts # Application bootstrap
├── config/ # Environment & external service config
├── modules/
│ └── transcription/ # Transcription domain (controller, service, repo, model)
├── middlewares/ # Global error handling
├── utils/ # Shared utilities (retry logic)
tests/

### Architectural Approach

The project follows a **layered architecture**:

- **Controller layer**: Handles HTTP requests and responses
- **Service layer**: Contains business logic (mocking download, transcription, retries)
- **Repository layer**: Encapsulates MongoDB queries
- **Model layer**: Defines Mongoose schemas and indexes

This separation improves testability, maintainability, and scalability.

---

## Setup & Running Locally

### Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/audio_transcription

AZURE_SPEECH_KEY=dummy-key
AZURE_SPEECH_REGION=eastus


Azure credentials are stubbed if real keys are not available.

Install & Run
npm install
npm run dev


Server will start at:

http://localhost:3000

API Endpoints
POST /api/transcription

Creates a mocked transcription.

Request

{
  "audioUrl": "https://example.com/sample.mp3"
}


Response

{
  "id": "65a1f0c8e8b9c1e..."
}

POST /api/azure-transcription

Creates a transcription using Azure Speech-to-Text (mocked if no credentials).

Request

{
  "audioUrl": "https://example.com/sample.mp3",
  "language": "en-US"
}


Response

{
  "id": "65a1f0c8e8b9c1e..."
}

GET /api/transcriptions

Fetch transcriptions created in the last 30 days, with pagination.

Query Params

?page=1&limit=10


Response

{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 42
  }
}

MongoDB Indexing Strategy

To support efficient queries on large datasets (100M+ records), an index is created on the createdAt field:

TranscriptionSchema.index({ createdAt: -1 });


This allows MongoDB to efficiently execute range queries for recent records without scanning the entire collection.

Scalability Considerations

To handle 10k+ concurrent requests, the service can evolve as follows:

Stateless API

Containerized with Docker

Horizontally scalable using Kubernetes or cloud auto-scaling

Async Processing

Move transcription jobs to a queue (Redis, SQS)

Dedicated worker processes for transcription

Performance Optimizations

MongoDB indexing and pagination

Caching recent transcriptions in Redis

Connection pooling

Error Handling & Reliability

Centralized error handling middleware

Input validation at controller level

Retry logic with exponential backoff for transient failures

Environment-based configuration

Testing

Basic Jest tests are included to validate setup and structure.

npm run test

Assumptions & Trade-offs

Audio download is mocked to focus on architecture

Azure Speech SDK is stubbed when credentials are unavailable

Authentication is omitted to keep scope focused

Future Improvements

Real audio download and streaming support

Background workers for transcription

Authentication and authorization

Observability (metrics, logging, tracing)

WebSocket-based realtime transcription
```

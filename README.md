# Audio Transcription Platform

A full-stack audio transcription platform built with **Node.js, TypeScript, Fastify, MongoDB, and Next.js**.

This project demonstrates backend system design, clean architecture, API integrations, MongoDB querying and indexing, scalability thinking, and a minimal frontend for end-to-end validation.

---

## Repository Structure

audio-transcription-platform/
├── server/ # Backend service (Fastify + MongoDB)
├── client/ # Frontend UI (Next.js)
├── .gitignore
└── README.md

markdown
Copy code

---

## Tech Stack

### Backend

- Node.js + TypeScript (strict mode)
- Fastify
- MongoDB (local or Atlas)
- Mongoose
- Azure Speech-to-Text (stubbed integration)
- Jest

### Frontend

- Next.js (App Router)
- React + TypeScript
- Fetch API
- Minimal CSS styling

---

## Backend Overview (`/server`)

### Key Features

- POST `/api/transcription` (mock transcription)
- POST `/api/azure-transcription` (Azure STT integration / stub)
- GET `/api/transcriptions` (last 30 days, paginated)
- Clean layered architecture:
  - Controllers
  - Services
  - Repositories
  - Models
- MongoDB indexing on `createdAt`
- Retry logic with exponential backoff
- Centralized error handling
- CORS enabled for frontend integration

### Run Backend

```bash
cd server
npm install
npm run dev
Backend runs at:

arduino
Copy code
http://localhost:8080
Frontend Overview (/client)
Features
Submit audio URL for transcription

Choose mock or Azure transcription

View transcription ID and text immediately

List recent transcriptions (auto-refresh)

Run Frontend
bash
Copy code
cd client
npm install
npm run dev
Frontend runs at:

arduino
Copy code
http://localhost:3000
Environment Variables
Backend (server/.env)
env
Copy code
PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/audio_transcription
AZURE_SPEECH_KEY=dummy-key
AZURE_SPEECH_REGION=eastus
Frontend (client/.env.local)
env
Copy code
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
.env files are intentionally excluded from Git.
.env.example files are provided for setup guidance.

MongoDB Indexing
An index is created on the createdAt field to efficiently query recent records:

ts
Copy code
TranscriptionSchema.index({ createdAt: -1 });
This ensures performant range queries even with large datasets (100M+ records).

Scalability Considerations
To support 10k+ concurrent requests, the system can evolve with:

Stateless backend services

Dockerized services

Horizontal scaling via Kubernetes or cloud autoscaling

Asynchronous processing

Queue-based transcription (Redis, SQS)

Dedicated worker processes

Performance optimizations

MongoDB indexing and pagination

Caching frequently accessed data

Connection pooling

Git & Repository Hygiene
.gitignore (root)
node_modules

.env files

build outputs (dist, .next)

logs and editor files

Environment Safety
Secrets are never committed

.env.example files are included

Project can be set up quickly without exposing credentials

Testing
Basic Jest tests are included in the backend to validate setup and structure.

bash
Copy code
cd server
npm run test
Assumptions & Trade-offs
Audio download and transcription are mocked to focus on architecture

Azure Speech SDK is stubbed if credentials are unavailable

Authentication is intentionally omitted to keep scope aligned with the assignment

Future Improvements
Real audio streaming and decoding

Background workers for transcription

Authentication and authorization

Observability (metrics, logs, tracing)

WebSocket-based real-time transcription

```

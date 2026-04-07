# MeetX - Video Conferencing App

A Google Meet-like video conferencing application built with the MERN stack.

## Tech Stack

- **Frontend**: React (Vite) + Material UI
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Real-time**: Socket.io (prepared for WebRTC)

## Project Structure

```
meetx/
├── client/          # React frontend
├── server/          # Express backend
├── .env             # Environment variables
└── README.md        # This file
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud)

### Installation

1. Install backend dependencies:
```bash
cd meetx/server
npm install
```

2. Install frontend dependencies:
```bash
cd meetx/client
npm install
```

### Running the App

1. Start the backend server:
```bash
cd meetx/server
npm run dev
```

2. Start the frontend (in a new terminal):
```bash
cd meetx/client
npm run dev
```

3. Open your browser and go to `http://localhost:3000`

## API Endpoints

- `GET /` - Health check (returns "Server is running")

## Scripts

### Backend
- `npm start` - Run server in production mode
- `npm run dev` - Run server with nodemon (auto-restart)

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

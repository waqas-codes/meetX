const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');

const { connectDB } = require('./config/db');
const dns = require('dns')
dns.setServers(["1.1.1.1", "8.8.8.8"])

dotenv.config();

const app = express();
const httpServer = createServer(app);

// CORS Configuration
// For production: Set FRONTEND_URL to your deployed frontend domain
// For development: Leave empty to allow all origins
const isProduction = process.env.NODE_ENV === 'production';
const frontendUrl = process.env.FRONTEND_URL;

// Socket.IO CORS setup
const socketCors = frontendUrl 
  ? { origin: [frontendUrl, 'http://localhost:3000'], methods: ['GET', 'POST'], credentials: false }
  : { origin: '*', methods: ['GET', 'POST'], credentials: false }; // Allow all for testing

console.log('Socket.IO CORS:', socketCors);

const io = new Server(httpServer, {
  cors: socketCors,
  pingTimeout: 60000,
  pingInterval: 25000,
});

// Express CORS configuration
const corsOptions = frontendUrl
  ? {
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        const allowed = [frontendUrl, 'http://localhost:3000', 'http://localhost:5173'];
        if (allowed.includes(origin)) {
          callback(null, true);
        } else {
          console.warn('CORS blocked origin:', origin);
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: false,
      optionsSuccessStatus: 200,
    }
  : {
      origin: '*', // Allow all origins for testing
      credentials: false,
      optionsSuccessStatus: 200,
    };

// Apply CORS to all routes
app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin || 'no-origin'}`);
  next();
});

connectDB();

// Health check endpoint - for keeping Render server awake
app.get('/', (req, res) => {
  res.json({ 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: require('./config/db').checkDBConnection() ? 'connected' : 'disconnected'
  });
});

app.use('/api/meeting', require('./routes/meetingRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

require('./sockets/meetingSocket')(io);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

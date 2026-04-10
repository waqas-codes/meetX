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

// Get allowed origins - always include localhost for development
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5173']
  : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'];

console.log('Allowed CORS origins:', allowedOrigins);

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  // Add ping timeout to detect disconnections faster
  pingTimeout: 60000,
  pingInterval: 25000,
});

// CORS configuration - must be before routes
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
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

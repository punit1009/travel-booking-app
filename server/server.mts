import 'dotenv/config';
import express, { type Express, type Request, type Response, type NextFunction, type RequestHandler, type ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// For ES modules __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import routes
import destinationRoutes from './routes/destinationRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Import models for type information
import type { IUser } from './models/User.js';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet() as RequestHandler);
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}) as RequestHandler);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter as RequestHandler);

// Other middleware
app.use(express.json({ limit: '10kb' }) as RequestHandler);
app.use(express.urlencoded({ extended: true, limit: '10kb' }) as RequestHandler);
app.use(compression() as RequestHandler);

// Logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev') as RequestHandler);
}

// Static files
app.use(express.static(join(__dirname, 'public')) as RequestHandler);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/travelBooking';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/packages', packageRoutes);

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Basic route
app.get('/api', (req: Request, res: Response) => {
  res.json({ 
    status: 'success',
    message: 'Welcome to the Travel Booking API',
    version: '1.0.0',
    endpoints: {
      destinations: '/api/destinations',
      documentation: 'Coming soon'
    }
  });
});

// 404 handler for unhandled routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Define error interface
interface AppError extends Error {
  statusCode?: number;
  status?: string;
  code?: number;
  errors?: Record<string, { message: string }>;
  errmsg?: string;
  keyValue?: Record<string, unknown>;
  stack?: string;
}

// Global error handling middleware
const errorHandler: ErrorRequestHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('🚨 ERROR:', err);
  
  // Set default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Handle different types of errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation Error',
      errors: err.errors
    });
  }
  
  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token. Please log in again.'
    });
  }
  
  // Handle duplicate field errors (MongoDB)
  if (err.code === 11000) {
    const field = err.keyValue ? Object.keys(err.keyValue)[0] : 'field';
    const value = err.errmsg?.match(/(["'])(?:(?=(\\?))\2.)*?\1/)?.[0] || 'value';
    const message = `Duplicate ${field} value: ${value}. Please use another value!`;
    
    return res.status(400).json({
      status: 'error',
      message
    });
  }
  
  // Handle JWT expired error
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Your token has expired! Please log in again.'
    });
  }
  
  // Development error handling - more verbose
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode || 500).json({
      status: err.status,
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack
      },
      message: err.message
    });
  }
  
  // Production error handling - minimal info
  return res.status(err.statusCode || 500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
};

app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`\n✅ Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error('Error:', err.name, err.message);
  
  // Close server & exit process
  server.close(() => {
    console.log('💥 Process terminated!');
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error('Error:', err.name, err.message);
  
  // Close server & exit process
  server.close(() => {
    console.log('💥 Process terminated!');
    process.exit(1);
  });
});

// Handle SIGTERM (for Heroku)
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});

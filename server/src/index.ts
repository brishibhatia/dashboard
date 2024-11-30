import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { itemRoutes } from './routes/itemRoutes';
import { errorHandler } from './middleware/errorHandler';
import { apiKeyMiddleware } from './middleware/apiKeyMiddleware';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Key middleware for protected routes
app.use('/api', apiKeyMiddleware);

// Routes
app.use('/api/items', itemRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  }); 
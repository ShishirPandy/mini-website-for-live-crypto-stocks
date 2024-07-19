import express from 'express';
import mongoose from 'mongoose';
import stockRoutes from './routes/stockRoutes';
import { fetchdata } from './services/stockServices';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://shishir17recruit:3PugotTufCrYzxbJ@cluster0.njlyejw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
 // Replace with your MongoDB connection string

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/api', stockRoutes);

// Initialize polling
fetchdata(); // To run immediately on startup
setInterval(fetchdata, 5000); // To run at intervals

export default app;

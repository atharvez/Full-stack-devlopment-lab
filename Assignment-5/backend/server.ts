import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import Feedback from './models/Feedback';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/api/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/feedback', async (req, res) => {
  try {
    const { studentName, course, rating, comments } = req.body;
    const newFeedback = new Feedback({ studentName, course, rating, comments });
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

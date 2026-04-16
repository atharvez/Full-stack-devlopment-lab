import mongoose from 'mongoose';
import { Project } from '@/models/Project';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio-db';

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    
    // Auto-seeding logic
    await seedData();
    
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

async function seedData() {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      console.log('Database is empty. Seeding initial data...');
      
      const initialProjects = [
        {
          title: "Lang2CAD",
          description: "A natural-language-to-CAD generation engine that converts prompts into editable parametric engineering models through structured parsing and rule-based geometry logic.",
          stack: ["Python", "Ollama", "CADQuery"],
          image: "/project-velocity.svg"
        },
        {
          title: "Agri Supply Chain Blockchain",
          description: "A blockchain-based agricultural supply chain system focused on transparent tracking, fair pricing, traceability, and full-stack visualization.",
          stack: ["Blockchain", "Next.js", "SQL", "Solana"],
          image: "/project-monarch.svg"
        },
        {
          title: "Website Development Portfolio",
          description: "A collection of responsive web experiences built with modern frontend practices, reusable UI components, and polished multi-device implementation.",
          stack: ["Next.js", "Tailwind CSS", "Figma"],
          image: "/project-signal.svg"
        }
      ];

      await Project.insertMany(initialProjects);
      console.log('Successfully seeded projects');
    }
  } catch (error) {
    console.error('Seeding error:', error);
  }
}

export default connectDB;

import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  stack: [{ type: String }],
  image: { type: String, required: true },
}, { timestamps: true });

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

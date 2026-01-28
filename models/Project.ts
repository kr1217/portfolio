import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for UI components (Serialized data)
export interface IProjectData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  images: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  videoUrl?: string;
  featured: boolean;
  status: 'Completed' | 'In Progress' | 'Maintenance' | 'Archived';
  type: 'Personal' | 'Client' | 'Open Source';
  createdAt: string | Date;
}

// Interface for Mongoose Document (Server-side)
export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  images: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  videoUrl?: string;
  featured: boolean;
  status: 'Completed' | 'In Progress' | 'Maintenance' | 'Archived';
  type: 'Personal' | 'Client' | 'Open Source';
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this project.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug for this project.'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this project.'],
  },
  problem: {
    type: String,
    required: [true, 'Please provide a problem statement.'],
  },
  solution: {
    type: String,
    required: [true, 'Please provide a solution overview.'],
  },
  techStack: {
    type: [String],
    required: [true, 'Please list the tech stack.'],
  },
  images: {
    type: [String],
    default: [],
  },
  githubUrl: {
    type: String,
  },
  liveDemoUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['Completed', 'In Progress', 'Maintenance', 'Archived'],
    default: 'Completed',
  },
  type: {
    type: String,
    enum: ['Personal', 'Client', 'Open Source'],
    default: 'Personal',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;

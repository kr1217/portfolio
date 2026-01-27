import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const projects = [
  {
    title: 'AI-Assisted Market Trading System',
    slug: 'ai-trading-system',
    description: 'A sophisticated market analysis tool using Python and TensorFlow to predict market trends based on historical data.',
    problem: 'Traders struggle to analyze vast amounts of historical data manually to identify subtle patterns in market volatility.',
    solution: 'Built a machine learning pipeline that ingests real-time market data, preprocesses it, and uses an LSTM model to output confidence scores for potential trades. Includes a React dashboard for visualization.',
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'React', 'MongoDB'],
    images: ['https://placehold.co/800x600/e2e8f0/1e293b?text=AI+Trading+System'],
    featured: true,
    githubUrl: 'https://github.com/example/ai-trading',
  },
  {
    title: 'E-commerce Analytics Dashboard',
    slug: 'ecommerce-dashboard',
    description: 'Real-time analytics dashboard for online retailers to track sales, inventory, and user behavior.',
    problem: 'Shop owners lacked actionable insights into their daily performance and inventory levels.',
    solution: 'Developed a comprehensive dashboard integrating Stripe and Google Analytics data. Features include real-time charts, automated reporting, and inventory alerts.',
    techStack: ['Next.js', 'Chart.js', 'PostgreSQL', 'Prisma'],
    images: ['https://placehold.co/800x600/e2e8f0/1e293b?text=Analytics+Dashboard'],
    featured: true,
    liveDemoUrl: 'https://demo-dashboard.example.com',
  },
  {
    title: 'Healthcare Management System',
    slug: 'hms-platform',
    description: 'A compliant patient management system for small clinics.',
    problem: 'Clinics were using paper-based records leading to errors and slow retrieval times.',
    solution: 'Digitized the entire workflow including patient intake, appointment scheduling, and history tracking with HIPAA-compliant security measures.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    images: ['https://placehold.co/800x600/e2e8f0/1e293b?text=Healthcare+App'],
    featured: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected to MongoDB');

    await Project.deleteMany({});
    console.log('Cleared existing projects');

    await Project.insertMany(projects);
    console.log('Seeded projects');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();

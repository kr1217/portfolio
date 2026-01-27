import mongoose from 'mongoose';
import Resume from '../models/Resume';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

const resumeData = {
  name: 'Fazeel Mehdi',
  title: 'Full Stack Web Developer',
  summary: 'A results-driven Full-Stack Developer with 2+ years of experience building efficient, scalable web solutions. Specialized in the MERN stack, Next.js, and Python automation, with a proven track record of delivering high-quality freelance projects for global clients.',
  contact: {
    email: 'fmehdi1217@gmail.com',
    phone: '+923076658036',
    location: 'Multan, Pakistan',
  },
  experience: [
    {
      title: 'Web Developer',
      company: 'Fiverr and Upwork',
      startDate: 'June 2024',
      endDate: 'Present',
      description: [
        'Built full-stack web applications using MERN Stack and Next.js.',
        'Developed RESTful APIs and managed database integrations.',
        'Created a website for a shipping company and a POS app for a store.',
        'Built an LMS using Laravel framework.'
      ]
    },
    {
      title: 'Web Development Intern',
      company: 'iFish Technologies',
      startDate: 'January 2024',
      endDate: 'June 2024',
      description: [
        'Created full-stack websites on Blazor using .NET platform for enterprise solutions.',
        'Designed scalable website architectures.'
      ]
    },
    {
      title: 'Web Development Intern',
      company: 'Signature Technologies',
      startDate: 'July 2023',
      endDate: 'January 2024',
      description: [
        'Designed frontend of websites using React and Material UI.',
        'Developed Python GUIs and automated visa application forms using Selenium and TensorFlow.',
        'Created games using Pygame and executable tools with Tkinter.'
      ]
    }
  ],
  education: [
    {
      degree: 'BS Computer Science',
      institution: 'Air University Multan Campus',
      year: 'July 2023',
      details: 'cgpa 3.46'
    },
    {
        degree: 'A-Level',
        institution: 'The City School Capital Campus',
        year: 'August 2018',
        details: 'Computer Science Major'
    }
  ],
  skills: ['C++', 'OOP', 'Python', 'DBMS', 'React', 'JavaScript', 'MERN Stack', 'Next.js', '.NET/Blazor']
};

async function seedResume() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected to MongoDB');

    await Resume.deleteMany({}); // Clear existing
    await Resume.create(resumeData);
    
    console.log('Resume seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding resume:', error);
    process.exit(1);
  }
}

seedResume();

import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  startDate: String,
  endDate: String,
  description: [String], // Array of bullet points
});

const EducationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year: String,
  details: String,
});

const ResumeSchema = new mongoose.Schema({
  name: String,
  title: String,
  summary: String,
  contact: {
    email: String,
    phone: String,
    location: String,
  },
  experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: [String],
}, { timestamps: true });

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);

import { Container } from '@/components/ui/Container';
import connectToDatabase from '@/lib/db';
import Resume from '@/models/Resume';
import { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { PrintButton } from '@/components/PrintButton';

export const metadata: Metadata = {
  title: 'Resume | Fazeel Mehdi',
  description: 'Professional experience and skills of Fazeel Mehdi.',
};

async function getResumeData() {
  await connectToDatabase();
  const resume = await Resume.findOne().sort({ createdAt: -1 });
  return resume;
}

export default async function ResumePage() {
  const resume = await getResumeData();

  if (!resume) {
      return (
          <Container><div className="py-24 text-center">Resume data not found.</div></Container>
      )
  }

  return (
    <div className="bg-muted/20 py-12 sm:py-24 print:bg-white print:py-0">
      <Container>
        <div className="max-w-[210mm] mx-auto bg-white text-slate-900 shadow-2xl print:shadow-none print:max-w-none overflow-hidden rounded-none print:rounded-none">
          
          {/* Vibrant Header */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-8 sm:p-12 print-exact print:bg-blue-800 print:text-white">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{resume.name}</h1>
                    <p className="text-xl text-blue-100 font-medium mt-2">{resume.title}</p>
                </div>
                {/* Contact Info - Compact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-blue-100">
                    {resume.contact.email && (
                        <a href={`mailto:${resume.contact.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                            <Mail className="w-4 h-4" /> {resume.contact.email}
                        </a>
                    )}
                    {resume.contact.phone && (
                        <div className="flex items-center gap-2">
                             <Phone className="w-4 h-4" /> {resume.contact.phone}
                        </div>
                    )}
                    {resume.contact.location && (
                        <div className="flex items-center gap-2 col-span-2">
                             <MapPin className="w-4 h-4" /> {resume.contact.location}
                        </div>
                    )}
                </div>
            </div>
            
            <p className="mt-8 text-lg leading-relaxed text-blue-50/90 max-w-3xl border-l-4 border-blue-400 pl-4 bg-white/5 p-4 rounded-r-lg print:text-white print:border-white">
                "{resume.summary}"
            </p>
          </div>

          <div className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12 print:gap-8">
            
            {/* Main Column: Experience */}
            <div className="lg:col-span-2 space-y-10">
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-wider border-b-2 border-slate-200 pb-2">
                        <span className="text-blue-700">Experience</span>
                    </h2>
                    <div className="space-y-8">
                        {resume.experience.map((exp: any, i: number) => (
                            <div key={i} className="relative pl-6 border-l-2 border-slate-200 last:border-0 pb-2">
                                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                    <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
                                    <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-0.5 rounded-full whitespace-nowrap print-exact print:bg-slate-100 print:text-black">
                                        {exp.startDate} – {exp.endDate}
                                    </span>
                                </div>
                                <div className="text-lg font-medium text-slate-700 mb-3">{exp.company}</div>
                                <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 marker:text-blue-500">
                                    {exp.description.map((point: string, j: number) => (
                                        <li key={j} className="leading-snug">{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects Section (Auto-Synced) */}
                {resume.projects && resume.projects.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-wider border-b-2 border-slate-200 pb-2">
                        <span className="text-blue-700">Recent Projects</span>
                    </h2>
                    <div className="space-y-6">
                        {resume.projects.slice(0, 3).map((proj: any, i: number) => (
                            <div key={i} className="relative pl-6 border-l-2 border-slate-200 last:border-0 pb-2">
                                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm" />
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                    <h3 className="text-lg font-bold text-slate-900">{proj.title}</h3>
                                </div>
                                <div className="text-slate-600 mb-2 leading-snug">{proj.description}</div>
                                <div className="flex flex-wrap gap-1">
                                    {proj.techStack?.map((tech: string, t: number) => (
                                        <span key={t} className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100 print-exact">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                )}
            </div>

            {/* Side Column: Skills & Education */}
            <div className="space-y-10">
                
                {/* Skills */}
                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-wider border-b-2 border-slate-200 pb-2">
                         <span className="text-blue-700">Skills Stack</span>
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {resume.skills.map((skill: string, i: number) => (
                            <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-md text-sm font-semibold border-l-4 border-blue-500 shadow-sm print-exact">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Education Section Removed for Freelancer Focus */}
                {/* 
                <section>
                     <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-wider border-b-2 border-slate-200 pb-2">
                        <span className="text-blue-700">Education</span>
                    </h2>
                    <div className="space-y-6">
                        {resume.education
                            .filter((edu: any) => !edu.degree.includes('Level'))
                            .map((edu: any, i: number) => (
                            <div key={i} className="bg-slate-50 p-5 rounded-lg border border-slate-100 print-exact">
                                <h3 className="text-base font-bold text-slate-900">{edu.degree}</h3>
                                <div className="text-blue-700 font-medium text-sm mt-1">{edu.institution}</div>
                                <div className="text-slate-500 text-xs mt-2 uppercase tracking-wide font-semibold">
                                    {edu.year}
                                </div>
                            </div>
                        ))}
                    </div>
                </section> 
                */}

            </div>

          </div>
        </div>
        
        <div className="mt-8 text-center print:hidden">
            <PrintButton />
        </div>
      </Container>
    </div>
  );
}

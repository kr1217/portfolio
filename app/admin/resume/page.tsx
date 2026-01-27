'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea'; // Assuming if not exists I'll use standard textarea or crate it. I think I only have Input/Button. I'll use standard textarea with same classes.
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';

export default function AdminResumePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    fetch('/api/resume')
      .then((res) => res.json())
      .then((data) => {
        setResume(data || {
            name: '',
            title: '',
            summary: '',
            contact: { email: '', phone: '', location: '' },
            experience: [],
            education: [],
            skills: []
        });
        setLoading(false);
      })
      .catch((err) => {
          console.error(err);
          setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/resume', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resume),
      });
      if (res.ok) {
        alert('Resume updated successfully!');
        router.refresh();
      } else {
        alert('Failed to update resume.');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving resume.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setResume({ ...resume, [field]: value });
  };

  const updateContact = (field: string, value: string) => {
      setResume({ ...resume, contact: { ...resume.contact, [field]: value } });
  }

  // --- Experience Handlers ---
  const addExperience = () => {
    setResume({
      ...resume,
      experience: [
        { title: '', company: '', startDate: '', endDate: '', description: [''] },
        ...resume.experience,
      ],
    });
  };

  const removeExperience = (index: number) => {
    const newExp = [...resume.experience];
    newExp.splice(index, 1);
    setResume({ ...resume, experience: newExp });
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const newExp = [...resume.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    setResume({ ...resume, experience: newExp });
  };
  
  const updateExperienceDesc = (expIndex: number, descIndex: number, value: string) => {
      const newExp = [...resume.experience];
      newExp[expIndex].description[descIndex] = value;
      setResume({...resume, experience: newExp});
  }

  const addExperienceDesc = (expIndex: number) => {
      const newExp = [...resume.experience];
      newExp[expIndex].description.push('');
      setResume({...resume, experience: newExp});
  }

  const removeExperienceDesc = (expIndex: number, descIndex: number) => {
      const newExp = [...resume.experience];
      newExp[expIndex].description.splice(descIndex, 1);
      setResume({...resume, experience: newExp});
  }


  // --- Skills Handler ---
  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const skillsArray = e.target.value.split(',').map(s => s.trim());
      setResume({ ...resume, skills: skillsArray });
  }


  if (loading) return <div className="p-8 text-center">Loading resume data...</div>;

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Edit Resume</h1>
        <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
           {saving && <Loader2 className="w-4 h-4 animate-spin" />}
           <Save className="w-4 h-4" /> Save Changes
        </Button>
      </div>

      {/* Basic Info */}
      <section className="bg-card p-6 rounded-lg shadow space-y-4 border border-border">
        <h2 className="text-lg font-semibold border-b border-border pb-2 text-foreground">Basic Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                <Input value={resume.name} onChange={(e: any) => updateField('name', e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-foreground mb-1">Professional Title</label>
                <Input value={resume.title} onChange={(e: any) => updateField('title', e.target.value)} />
            </div>
             <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">Summary (Update YOE here)</label>
                <textarea 
                    className="w-full rounded-md border border-input bg-background p-2 focus:ring-2 focus:ring-primary outline-none min-h-[100px] text-foreground"
                    value={resume.summary} 
                    onChange={(e) => updateField('summary', e.target.value)} 
                />
            </div>
             <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <Input value={resume.contact?.email} onChange={(e: any) => updateContact('email', e.target.value)} />
            </div>
             <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                <Input value={resume.contact?.phone} onChange={(e: any) => updateContact('phone', e.target.value)} />
            </div>
             <div>
                <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                <Input value={resume.contact?.location} onChange={(e: any) => updateContact('location', e.target.value)} />
            </div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-card p-6 rounded-lg shadow space-y-6 border border-border">
        <div className="flex justify-between items-center border-b border-border pb-2">
            <h2 className="text-lg font-semibold text-foreground">Experience</h2>
            <Button size="sm" variant="outline" onClick={addExperience} className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Position
            </Button>
        </div>
        
        {resume.experience.map((exp: any, i: number) => (
            <div key={i} className="border border-border rounded-md p-4 bg-muted/20 relative">
                 <button 
                    onClick={() => removeExperience(i)}
                    className="absolute top-4 right-4 text-destructive hover:text-destructive/80"
                    title="Delete Position"
                 >
                    <Trash2 className="w-5 h-5" />
                 </button>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-8">
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground">Job Title</label>
                        <Input value={exp.title} onChange={(e: any) => updateExperience(i, 'title', e.target.value)} className="bg-background" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground">Company</label>
                        <Input value={exp.company} onChange={(e: any) => updateExperience(i, 'company', e.target.value)} className="bg-background" />
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-muted-foreground">Start Date</label>
                        <Input value={exp.startDate} onChange={(e: any) => updateExperience(i, 'startDate', e.target.value)} className="bg-background" />
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-muted-foreground">End Date</label>
                        <Input value={exp.endDate} onChange={(e: any) => updateExperience(i, 'endDate', e.target.value)} className="bg-background" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="block text-xs font-medium text-muted-foreground">Description Points</label>
                    {exp.description.map((desc: string, j: number) => (
                        <div key={j} className="flex gap-2">
                            <Input 
                                value={desc} 
                                onChange={(e: any) => updateExperienceDesc(i, j, e.target.value)} 
                                className="bg-background flex-1"
                            />
                            <button onClick={() => removeExperienceDesc(i, j)} className="text-muted-foreground hover:text-destructive">X</button>
                        </div>
                    ))}
                    <Button size="sm" variant="ghost" onClick={() => addExperienceDesc(i)} className="text-primary h-8 px-2 text-xs">
                        + Add Bullet Point
                    </Button>
                 </div>
            </div>
        ))}
      </section>

       {/* Skills */}
      <section className="bg-card p-6 rounded-lg shadow space-y-4 border border-border">
        <h2 className="text-lg font-semibold border-b border-border pb-2 text-foreground">Skills</h2>
         <div>
            <label className="block text-sm font-medium text-foreground mb-1">Comma Separated Skills</label>
            <textarea 
                className="w-full rounded-md border border-input bg-background p-2 focus:ring-2 focus:ring-primary outline-none min-h-[100px] text-foreground"
                value={resume.skills.join(', ')} 
                onChange={handleSkillsChange}
            />
            <p className="text-xs text-muted-foreground mt-1">Example: React, Node.js, Python, AWS</p>
        </div>
      </section>
    </div>
  );
}

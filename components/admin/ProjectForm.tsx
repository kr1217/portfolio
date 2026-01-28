'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Loader2, X } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
// import { IProject } from '@/models/Project';

interface ProjectFormProps {
  initialData?: any; // IProject
  mode: 'create' | 'edit';
}

export function ProjectForm({ initialData, mode }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    problem: initialData?.problem || '',
    solution: initialData?.solution || '',
    techStack: initialData?.techStack?.join(', ') || '',
    images: initialData?.images?.join(', ') || '',
    githubUrl: initialData?.githubUrl || '',
    liveDemoUrl: initialData?.liveDemoUrl || '',
    videoUrl: initialData?.videoUrl || '',
    featured: initialData?.featured || false,
    status: initialData?.status || 'Completed',
    type: initialData?.type || 'Personal',
  });

  useEffect(() => {
    if (initialData) {
        console.log('ProjectForm received initialData:', initialData);
        setFormData({
            title: initialData.title || '',
            slug: initialData.slug || '',
            description: initialData.description || '',
            problem: initialData.problem || '',
            solution: initialData.solution || '',
            techStack: initialData.techStack?.join(', ') || '',
            images: initialData.images?.join(', ') || '',
            githubUrl: initialData.githubUrl || '',
            liveDemoUrl: initialData.liveDemoUrl || '',
            videoUrl: initialData.videoUrl || '',
            featured: initialData.featured || false,
            status: initialData.status || 'Completed',
            type: initialData.type || 'Personal',
        });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
        ...formData,
        techStack: formData.techStack.split(',').map((s: string) => s.trim()).filter(Boolean),
        images: formData.images.split(',').map((s: string) => s.trim()).filter(Boolean),
    };

    try {
        const url = mode === 'create' ? '/api/projects' : `/api/projects/${initialData._id}`;
        const method = mode === 'create' ? 'POST' : 'PUT';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error('Failed to save');

        router.push('/admin');
        router.refresh();
    } catch (error) {
        console.error(error);
        alert('Something went wrong');
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-card p-6 rounded-lg shadow border border-border">
       <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-foreground">Title</label>
            <input 
                type="text" name="title" id="title" required 
                value={formData.title} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-foreground">Slug</label>
            <input 
                type="text" name="slug" id="slug" required 
                value={formData.slug} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
            />
          </div>

          <div className="flex items-center h-full pt-6">
             <div className="flex items-center">
                <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={handleChange as any}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-foreground">
                    Featured Project
                </label>
             </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-foreground">Status</label>
            <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
            >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Archived">Archived</option>
            </select>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-foreground">Project Type</label>
            <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
            >
                <option value="Personal">Personal</option>
                <option value="Client">Client</option>
                <option value="Open Source">Open Source</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-foreground">Short Description</label>
            <textarea 
                name="description" id="description" rows={3} required
                value={formData.description} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="problem" className="block text-sm font-medium text-foreground">Problem</label>
            <textarea 
                name="problem" id="problem" rows={3} required
                value={formData.problem} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="solution" className="block text-sm font-medium text-foreground">Solution</label>
            <textarea 
                name="solution" id="solution" rows={3} required
                value={formData.solution} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="techStack" className="block text-sm font-medium text-foreground">Tech Stack (comma separated)</label>
            <input 
                type="text" name="techStack" id="techStack" required 
                placeholder="React, Next.js, OpenAI"
                value={formData.techStack} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">Project Images</label>
            
            <div className="flex flex-wrap gap-4 mb-4">
                {formData.images.split(',').map((img: string) => img.trim()).filter(Boolean).map((img: string, index: number) => (
                    <div key={index} className="relative group w-24 h-24 border rounded overflow-hidden shadow-sm">
                        <img src={img} alt="Project" className="object-cover w-full h-full" />
                        <button
                            type="button"
                            onClick={() => {
                                const newImages = formData.images.split(',').map((s: string) => s.trim()).filter(Boolean);
                                newImages.splice(index, 1);
                                setFormData({ ...formData, images: newImages.join(', ') });
                            }}
                            className="absolute top-0 right-0 bg-destructive text-destructive-foreground p-1 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}
            </div>

            <CldUploadWidget 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'portfolio_preset'}
                options={{ multiple: true }}
                onSuccess={(result: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                    if (result?.info?.secure_url) {
                        const imageUrl = result.info.secure_url;
                        setFormData(prev => {
                            const currentImages = prev.images ? prev.images.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
                            // Avoid duplicates
                            if (currentImages.includes(imageUrl)) return prev;
                            return { ...prev, images: [...currentImages, imageUrl].join(', ') };
                        });
                    }
                }}
                onQueuesEnd={(result, { widget }) => {
                    widget.close();
                }}
                onClose={() => {
                     document.body.style.overflow = "auto";
                }}
            >
              {({ open }) => {
                return (
                  <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={() => open()}
                    className="w-full sm:w-auto"
                  >
                    Upload Image
                  </Button>
                );
              }}
            </CldUploadWidget>
            <p className="text-xs text-muted-foreground mt-2">
                Click upload and select your image. Supports JPG, PNG, WEBP.
            </p>
          </div>

           <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium text-foreground">GitHub URL</label>
            <input 
                type="url" name="githubUrl" id="githubUrl"
                value={formData.githubUrl} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
            />
          </div>

           <div>
            <label htmlFor="liveDemoUrl" className="block text-sm font-medium text-foreground">Live Demo URL</label>
            <input 
                type="url" name="liveDemoUrl" id="liveDemoUrl"
                value={formData.liveDemoUrl} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
            />
           </div>

           <div>
            <label htmlFor="videoUrl" className="block text-sm font-medium text-foreground">Video URL / Upload</label>
            <div className="flex gap-2">
                 <input 
                    type="url" name="videoUrl" id="videoUrl"
                    value={formData.videoUrl} onChange={handleChange}
                    placeholder="https://cloudinary.com/..."
                    className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
                />
                 <CldUploadWidget 
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'portfolio_preset'}
                    options={{ resourceType: 'video', maxFiles: 1 }}
                    onSuccess={(result: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                        if (result?.info?.secure_url) {
                            setFormData(prev => ({ ...prev, videoUrl: result.info.secure_url }));
                        }
                    }}
                    onQueuesEnd={(result, { widget }) => {
                        widget.close();
                    }}
                    onClose={() => {
                        document.body.style.overflow = "auto";
                    }}
                >
                {({ open }) => {
                    return (
                    <Button 
                        type="button" 
                        variant="secondary" 
                        onClick={() => open()}
                        className="mt-1 shrink-0"
                    >
                        Upload Video
                    </Button>
                    );
                }}
                </CldUploadWidget>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
                Paste a URL or upload a demo video (MP4, WebM).
            </p>
          </div>
       </div>

       <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === 'create' ? 'Create Project' : 'Save Changes'}
          </Button>
       </div>
    </form>
  );
}

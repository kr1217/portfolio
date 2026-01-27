'use client';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useState } from 'react';
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
       setStatus('error');
       setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="bg-background py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Contact Me</h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Have a project in mind? Let's discuss how I can help you build it.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-xl sm:mt-20">
            {status === 'success' ? (
                <div className="rounded-md bg-emerald-100/10 border border-emerald-500/20 p-4 mb-8">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-emerald-500" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-bold text-foreground">Message sent successfully</h3>
                            <div className="mt-2 text-sm text-foreground font-medium">
                                <p>Thanks for reaching out! I'll get back to you as soon as possible.</p>
                            </div>
                            <div className="mt-4">
                                <div className="-mx-2 -my-1.5 flex">
                                    <button
                                        type="button"
                                        onClick={() => setStatus('idle')}
                                        className="rounded-md bg-emerald-100 dark:bg-emerald-900/30 px-3 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
             <form onSubmit={handleSubmit} className="space-y-6">
                 {status === 'error' && (
                     <div className="rounded-md bg-destructive/10 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertCircle className="h-5 w-5 text-destructive" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-destructive">Error</h3>
                                <div className="mt-2 text-sm text-destructive">{errorMessage}</div>
                            </div>
                        </div>
                     </div>
                 )}
            
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold leading-6 text-foreground">
                    Name
                  </label>
                  <div className="mt-2.5">
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-foreground">
                    Email
                  </label>
                  <div className="mt-2.5">
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-foreground">
                    Message
                  </label>
                  <div className="mt-2.5">
                    <Textarea
                      name="message"
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <Button type="submit" disabled={status === 'loading'} className="w-full">
                    {status === 'loading' ? (
                        <>
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                        </>
                    ) : (
                        "Send Message"
                    )}
                  </Button>
                </div>
              </form>
            )}
            
            <div className="mt-16 border-t border-border pt-8 text-center">
                 <h3 className="text-base font-semibold leading-7 text-foreground">Or email me directly</h3>
                 <a href="mailto:fmehdi1217@gmail.com" className="mt-2 block text-lg font-bold text-primary hover:text-primary/80 transition-colors">
                    fmehdi1217@gmail.com
                 </a>
            </div>
        </div>
      </Container>
    </div>
  );
}

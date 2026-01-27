'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Loader2, Star } from 'lucide-react';

export function ReviewForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    comment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, rating }),
      });

      if (!res.ok) throw new Error('Failed to submit review');

      setSuccess(true);
      setFormData({ name: '', company: '', comment: '' });
      setRating(5);
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-800 mb-4">
          <Star className="w-6 h-6 text-green-600 dark:text-green-300" />
        </div>
        <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">Thank You!</h3>
        <p className="text-green-700 dark:text-green-300 mb-6">
          Your review has been submitted successfully. We appreciate your feedback!
        </p>
        <Button onClick={() => setSuccess(false)} variant="outline" className="border-green-600 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900">
          Submit Another Review
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-8 max-w-xl mx-auto">
      <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
           <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
           <div className="flex gap-2">
             {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-8 h-8 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
                  />
                </button>
             ))}
           </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
          <input
            type="text" name="name" id="name" required
            value={formData.name} onChange={handleChange}
            className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-3"
            placeholder="John Doe"
          />
        </div>

        <div>
           <label htmlFor="company" className="block text-sm font-medium text-foreground">Company (Optional)</label>
           <input
             type="text" name="company" id="company"
             value={formData.company} onChange={handleChange}
             className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-3"
             placeholder="Tech Solutions Inc."
           />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-foreground">Your Feedback</label>
          <textarea
            name="comment" id="comment" rows={4} required
            value={formData.comment} onChange={handleChange}
            className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-3"
            placeholder="Tell us about your experience..."
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Review
        </Button>
      </form>
    </div>
  );
}

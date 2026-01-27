import { Container } from '@/components/ui/Container';
import { ReviewForm } from '@/components/ReviewForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leave a Review | DevPortfolio',
  description: 'Share your experience working with me. Your feedback helps me improve!',
};

export default function ReviewsPage() {
  return (
    <div className="bg-background py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Client Reviews</h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            I value your feedback. Please let me know about your experience working on our recent project.
          </p>
        </div>
        
        <div className="mx-auto max-w-xl">
           <ReviewForm />
        </div>
      </Container>
    </div>
  );
}

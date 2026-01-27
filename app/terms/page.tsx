import { Container } from '@/components/ui/Container';

export default function TermsPage() {
  return (
    <div className="py-24">
      <Container>
        <div className="prose prose-lg dark:prose-invert mx-auto">
          <h1>Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            The content, design, and code on this website (excluding client projects shown for portfolio purposes) are the intellectual property of the Developer.
          </p>

          <h2>3. Project Displays</h2>
          <p>
            Projects displayed in the portfolio are for demonstration purposes. Original repository rights belong to their respective owners as agreed upon in contract.
          </p>

          <h2>4. Limitation of Liability</h2>
          <p>
             The materials on this website are provided on an 'as is' basis. I make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2>5. Contact</h2>
          <p>
            For any inquiries regarding these terms, please contact me via the site's contact form.
          </p>
        </div>
      </Container>
    </div>
  );
}

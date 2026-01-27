import { Container } from '@/components/ui/Container';

export default function PrivacyPage() {
  return (
    <div className="py-24">
      <Container>
        <div className="prose prose-lg dark:prose-invert mx-auto">
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy explains how I (the Developer) collect, use, and protect your information when you visit this portfolio website.
          </p>

          <h2>2. Information Collected</h2>
          <p>
            I only collect information that you voluntarily provide via the <strong>Contact Form</strong> or when submitting a <strong>Client Review</strong>. This may include:
          </p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Message content</li>
            <li>Review rating and comments</li>
          </ul>

          <h2>3. How Data is Used</h2>
          <p>
            Your data is used solely for:
          </p>
          <ul>
            <li>Responding to your inquiries.</li>
            <li>Displaying your review on the website (with your permission).</li>
            <li>Improving my services.</li>
          </ul>
          <p>
            I do <strong>not</strong> sell, trade, or rent your personal identification information to others.
          </p>

          <h2>4. Cookies</h2>
          <p>
            This site uses minimal cookies to ensure functionality (e.g., authentication for the admin panel). No third-party tracking or advertising cookies are used.
          </p>

          <h2>5. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact me via the form on the website.
          </p>
        </div>
      </Container>
    </div>
  );
}

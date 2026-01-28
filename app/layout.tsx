import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fazeeldev.vercel.app';

export const metadata: Metadata = {
  title: 'Fazeel Mehdi | Full Stack Web Developer',
  description: 'Portfolio of Fazeel Mehdi, a Full-Stack Developer specializing in MERN, Next.js, and Python AI solutions.',
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: 'Fazeel Mehdi | Full Stack Web Developer',
    description: 'Portfolio of Fazeel Mehdi, a Full-Stack Developer specializing in MERN, Next.js, and Python AI solutions.',
    url: '/',
    siteName: 'Fazeel Mehdi Portfolio',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Fazeel Mehdi',
    url: baseUrl,
    jobTitle: 'Full Stack Web Developer',
    sameAs: [
      'https://github.com/kr1217',
      // Add LinkedIn or other profiles here if available
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    }
  };

  return (
    <html lang="en" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans flex h-full flex-col bg-background text-foreground`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-auto">
            {children}
          </main>
          <Footer />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

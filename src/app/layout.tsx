import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import { AuthProvider } from '@/components/AuthProvider';
import AuthGate from '@/components/AuthGate';

export const metadata: Metadata = {
  title: 'Scout Analysis Tool | Yext',
  description: 'Interactive data exploration tool for Yext Scout competitive intelligence data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-mist min-h-screen">
        <AuthProvider>
          <AuthGate>
            <Navigation />
            <main className="ml-64 min-h-screen">
              {children}
            </main>
          </AuthGate>
        </AuthProvider>
      </body>
    </html>
  );
}

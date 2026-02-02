import type { Metadata } from 'next';
import './globals.css';

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
        {children}
      </body>
    </html>
  );
}

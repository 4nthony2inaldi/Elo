import Navigation from '@/components/Navigation';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </>
  );
}

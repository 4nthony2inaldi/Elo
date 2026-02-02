'use client';

import { useAuth } from './AuthProvider';
import LoginPage from './LoginPage';
import { ReactNode } from 'react';

export default function AuthGate({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
}

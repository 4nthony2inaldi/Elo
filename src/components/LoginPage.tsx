'use client';

import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

    const success = await login(password);
    if (!success) {
      setError(true);
      setPassword('');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-midnight to-sea-blue p-4">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-frost-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-electric-blue to-sea-blue rounded-2xl mb-4">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <h1 className="text-2xl font-semibold text-midnight">
              Scout <span className="text-electric-blue">Analysis</span>
            </h1>
            <p className="text-midnight/60 mt-2 text-sm">
              Competitive intelligence insights
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-midnight/70 mb-2">
                Enter password to continue
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-midnight/40" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Password"
                  className={`w-full pl-12 pr-12 py-4 rounded-xl border ${
                    error ? 'border-coral bg-coral/5' : 'border-mist'
                  } focus:outline-none focus:ring-2 focus:ring-electric-blue/50 focus:border-electric-blue transition-all`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-midnight/40 hover:text-midnight/60"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 mt-3 text-coral text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Incorrect password. Please try again.</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-4 px-6 bg-electric-blue text-white font-semibold rounded-xl hover:bg-sea-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/50 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Access Scout'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-mist text-center">
            <p className="text-xs text-midnight/40">
              Internal tool for Yext sales & research teams
            </p>
          </div>
        </div>

        {/* Powered by */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Powered by <span className="text-white font-medium">Yext</span>
          </p>
        </div>
      </div>
    </div>
  );
}

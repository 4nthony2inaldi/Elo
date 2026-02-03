'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Search,
  BarChart3,
  FileText,
  Building2,
  Presentation,
  LogOut,
  BookOpen
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/explorer', label: 'Explorer', icon: Search },
  { href: '/brands', label: 'Brand Lookup', icon: Building2 },
  { href: '/benchmarks', label: 'Benchmarks', icon: BarChart3 },
  { href: '/proof-points', label: 'Proof Points', icon: FileText },
  { href: '/reports', label: 'Reports', icon: Presentation },
  { href: '/methodology', label: 'Methodology', icon: BookOpen },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-midnight text-snow flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image
            src="/images/Yext_Logo_White.svg"
            alt="Yext"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Scout</h1>
            <p className="text-xs text-white/60 tracking-wide">by Yext</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-6">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-frost-blue text-sea-blue font-medium'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 mb-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Sign Out</span>
        </button>
        <div className="text-xs text-white/40 text-center">
          <p>Powered by Elo Rankings</p>
          <p className="mt-1">~19.6M results analyzed</p>
        </div>
      </div>
    </nav>
  );
}

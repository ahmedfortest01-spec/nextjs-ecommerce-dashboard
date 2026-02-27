'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useStore((state) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user && pathname === '/dashboard') {
      router.push('/login');
    }
  }, [mounted, user, pathname, router]);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}

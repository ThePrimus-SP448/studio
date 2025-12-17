'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, LayoutDashboard, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/portfolio', label: 'Portfolio', icon: Briefcase },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 p-4">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Button
            key={link.href}
            asChild
            variant={isActive ? 'default' : 'ghost'}
            justify="start"
            className="text-base"
          >
            <Link href={link.href}>
              <link.icon className="mr-2 h-5 w-5" />
              {link.label}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}

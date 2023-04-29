'use client';

import { useTheme } from 'next-themes';
import { UserButton } from '@clerk/nextjs';

import SunIcon from '@/assets/icons/sun.svg';
import MoonIcon from '@/assets/icons/moon.svg';

import { Button } from '@/components/ui/Button';

export default function DashboardLayoutHeaderActions() {
  const { setTheme } = useTheme();
  return (
    <div className="flex gap-2">
      <Button
        size="xs"
        variant="ghost"
        className="flex p-2 dark:hidden"
        onClick={() => setTheme('dark')}
      >
        <SunIcon className="h-4 w-4" />
      </Button>
      <Button
        size="xs"
        variant="ghost"
        className="hidden p-2 dark:flex"
        onClick={() => setTheme('light')}
      >
        <MoonIcon className="h-4 w-4" />
      </Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

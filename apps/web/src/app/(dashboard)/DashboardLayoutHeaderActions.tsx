"use client";

import { useTheme } from "next-themes";
import { UserButton } from "@clerk/nextjs";

import SunIcon from '@/assets/icons/sun.svg';
import MoonIcon from '@/assets/icons/moon.svg';

import { Button } from "@/components/ui/Button";

export default function DashboardLayoutHeaderActions() {
  const { setTheme } = useTheme();
  return (
    <div className="flex gap-2">
      <Button size="xs" variant="ghost" className="flex dark:hidden p-2" onClick={() => setTheme('dark')}>
        <SunIcon className="w-4 h-4" />
      </Button>
      <Button size="xs" variant="ghost" className="hidden dark:flex p-2" onClick={() => setTheme('light')}>
        <MoonIcon className="w-4 h-4" />
      </Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

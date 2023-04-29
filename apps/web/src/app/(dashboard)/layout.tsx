import { PropsWithChildren } from 'react';

import DashboardLayoutHeaderActions from './DashboardLayoutHeaderActions';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex min-h-[57px] w-full items-center justify-between border-b-[0.5px] border-black/10 px-4 py-3 dark:border-white/10 sm:px-6">
        <span className="text-sm font-semibold">TinyPath</span>
        <div className="flex">
          <DashboardLayoutHeaderActions />
        </div>
      </div>
      {children}
    </div>
  );
}

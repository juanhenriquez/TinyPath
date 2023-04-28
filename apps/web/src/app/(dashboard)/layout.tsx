import { PropsWithChildren } from "react";

import DashboardLayoutHeaderActions from "./DashboardLayoutHeaderActions";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex w-full min-h-[57px] border-b-[0.5px] border-black/10 dark:border-white/10 px-4 sm:px-6 py-3 items-center justify-between">
        <span className="text-sm font-semibold">TinyPath</span>
        <div className="flex">
          <DashboardLayoutHeaderActions />
        </div>
      </div>
      {children}
    </div>
  );
}

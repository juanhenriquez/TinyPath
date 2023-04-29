"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "./ui/Tooltip";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      themes={["dark", "light"]}
    >
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}

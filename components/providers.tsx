"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return <NextThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange><TooltipProvider>{children}</TooltipProvider></NextThemeProvider>;
}

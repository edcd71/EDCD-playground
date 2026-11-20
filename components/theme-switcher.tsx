"use client";

import { useTheme } from "next-themes";
import { Laptop, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const current = theme ?? "system";
  const next = current === "dark" ? "light" : current === "light" ? "system" : "dark";
  const Label = current === "dark" ? Moon : current === "light" ? Sun : Laptop;
  return <Button className="size-11" variant="ghost" size="icon" aria-label={`Theme: ${current}. Switch to ${next}`} title={`Theme: ${current}`} onClick={() => setTheme(next)}><Label className="size-4" /></Button>;
}

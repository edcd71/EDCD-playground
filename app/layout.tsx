import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Fieldnotes — Prototype Playground", template: "%s · Fieldnotes" },
  description: "A private collection of little things worth making.",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f3f1eb" }, { media: "(prefers-color-scheme: dark)", color: "#171b18" }] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><Providers>{children}</Providers></body></html>;
}

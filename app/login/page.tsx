"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const result = await response.json();
      if (!response.ok) { setError(result.error ?? "Could not unlock the workspace."); return; }
      const requested = new URLSearchParams(window.location.search).get("next");
      const nextPath = requested?.startsWith("/") && !requested.startsWith("//") && !requested.includes("\\") ? requested : "/";
      router.replace(nextPath); router.refresh();
    } catch { setError("Could not reach the workspace. Try again."); }
    finally { setBusy(false); }
  }

  return <main className="login-screen"><div className="fixed right-4 top-4"><ThemeSwitcher/></div><Card className="login-card"><CardHeader><div className="mb-3 grid size-10 place-items-center rounded-full bg-secondary text-secondary-foreground"><KeyRound size={18}/></div><CardTitle className="font-serif text-3xl">A little privacy.</CardTitle><CardDescription>This playground is just for you. Enter the workspace password to come in.</CardDescription></CardHeader><CardContent><form onSubmit={submit}><label className="grid gap-2 text-sm" htmlFor="password">Workspace password<Input id="password" type="password" autoComplete="current-password" autoFocus value={password} onChange={(event) => setPassword(event.target.value)} required/></label>{error && <p role="alert" className="login-error">{error}</p>}<Button type="submit" disabled={busy}>{busy ? "Checking…" : "Open the playground"}</Button></form></CardContent></Card></main>;
}

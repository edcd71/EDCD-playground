"use client";

import { useSyncExternalStore } from "react";
import { Badge } from "@/components/ui/badge";

function localTime() {
  return new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" }).format(new Date());
}

function subscribe(onChange: () => void) {
  const interval = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(interval);
}

export default function SlowClock() {
  const time = useSyncExternalStore(subscribe, localTime, () => "--:--");

  return (
    <article className="prototype-panel">
      <Badge variant="outline">YOUR LOCAL TIME</Badge>
      <h1>The slow clock</h1>
      <p>Let the day take the time it takes.</p>
      <div className="prototype-display">
        <time className="font-serif text-6xl tabular-nums" aria-live="off">{time}</time>
      </div>
      <p>A moment is already happening.</p>
    </article>
  );
}

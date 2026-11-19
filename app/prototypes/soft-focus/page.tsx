"use client";

import { useEffect, useReducer } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { focusTimerReducer, formatCountdown, initialFocusTimer } from "./timer";

export default function SoftFocus() {
  const [timer, dispatch] = useReducer(focusTimerReducer, initialFocusTimer);
  useEffect(() => {
    if (!timer.running) return;
    const interval = window.setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => window.clearInterval(interval);
  }, [timer.running]);
  const display = formatCountdown(timer.seconds);
  return (
    <article className="prototype-panel">
      <Badge variant="outline">ONE THING AT A TIME</Badge>
      <h1>Soft focus</h1>
      <p>A quiet minute to stay with one thing.</p>
      <div className="prototype-display">
        <span className="font-mono text-5xl tabular-nums" aria-live="off">
          {timer.seconds === 0 ? "Done" : display}
        </span>
      </div>
      <p className="min-h-6">
        {timer.seconds === 0
          ? "You made a little room."
          : timer.running
            ? "Nothing else needs you for this moment."
            : "Start whenever you feel ready."}
      </p>
      <div className="mt-5 flex justify-center gap-2">
        {timer.seconds === 0 ? (
          <Button className="h-11" onClick={() => dispatch({ type: "restart" })}>
            <RotateCcw aria-hidden="true" /> Another minute
          </Button>
        ) : (
          <Button className="h-11" onClick={() => dispatch({ type: timer.running ? "pause" : "start" })}>
            {timer.running ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            {timer.running ? "Pause" : "Begin a quiet minute"}
          </Button>
        )}
      </div>
    </article>
  );
}

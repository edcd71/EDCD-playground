"use client";

import { useState } from "react";
import { Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { notes, stageScales, stages } from "./data";

export default function TinyGarden() {
  const [stage, setStage] = useState(0);
  const Stage = stages[stage];
  return (
    <article className="prototype-panel">
      <Badge variant="outline">GROWING THINGS</Badge>
      <h1>A tiny garden</h1>
      <p>Some things get better when you give them a little time.</p>
      <div
        className="prototype-display"
        aria-live="polite"
        aria-label={`Garden growth stage ${stage + 1} of ${stages.length}`}
      >
        <Stage className={`size-14 stroke-[1.2] transition-transform duration-500 ${stageScales[stage]}`} />
      </div>
      <p className="min-h-6">{notes[stage]}</p>
      <Button
        className="h-11"
        onClick={() => setStage((current) => Math.min(current + 1, stages.length - 1))}
        disabled={stage === stages.length - 1}
      >
        <Droplets aria-hidden="true" />
        {stage === stages.length - 1 ? "All grown" : "Give it a little water"}
      </Button>
      <div className="mt-6 flex justify-center gap-1.5" aria-hidden="true">
        {stages.map((_, index) => (
          <span
            key={index}
            className={`size-1.5 rounded-full ${index <= stage ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>
    </article>
  );
}

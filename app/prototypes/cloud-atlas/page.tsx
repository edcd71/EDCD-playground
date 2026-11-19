"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { observations } from "./data";

export default function CloudAtlas() {
  const [index, setIndex] = useState(0);
  const cloud = observations[index];
  const Icon = cloud.Icon;
  return (
    <article className="prototype-panel">
      <Badge variant="outline">FIELD GUIDE · {String(index + 1).padStart(2, "0")} / 03</Badge>
      <h1>Cloud atlas</h1>
      <p>A small guide to what is moving above you.</p>
      <div className="prototype-display relative">
        <span className="absolute size-28 rounded-full border border-border" />
        <Icon className="relative size-14 stroke-[1.2] text-primary" aria-hidden="true" />
      </div>
      <h2 className="font-serif text-2xl text-foreground">{cloud.name}</h2>
      <p>{cloud.note}</p>
      <Button
        variant="outline"
        className="mt-3 h-11"
        onClick={() => setIndex((current) => (current + 1) % observations.length)}
      >
        Look at another cloud
      </Button>
    </article>
  );
}

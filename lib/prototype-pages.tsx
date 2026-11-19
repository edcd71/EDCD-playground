import type { ComponentType } from "react";
import TinyGarden from "@/app/prototypes/tiny-garden/page";
import CloudAtlas from "@/app/prototypes/cloud-atlas/page";
import SoftFocus from "@/app/prototypes/soft-focus/page";
import TideNotes from "@/app/prototypes/tide-notes/page";
import SlowClock from "@/app/prototypes/slow-clock/page";
import ColorGarden from "@/app/prototypes/color-garden/page";

export const prototypePages: Record<string, ComponentType> = {
  "tiny-garden": TinyGarden,
  "cloud-atlas": CloudAtlas,
  "soft-focus": SoftFocus,
  "tide-notes": TideNotes,
  "slow-clock": SlowClock,
  "color-garden": ColorGarden,
};

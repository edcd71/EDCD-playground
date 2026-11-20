import { Flower2, Leaf, Sprout, TreeDeciduous } from "lucide-react";

export const stages = [Sprout, Leaf, TreeDeciduous, Flower2, Flower2] as const;
export const notes = [
  "A small beginning.",
  "A green thought appears.",
  "Two leaves, finding the light.",
  "Something is opening.",
  "Look at that. Something is blooming.",
] as const;
export const stageScales = ["scale-100", "scale-105", "scale-110", "scale-115", "scale-120"] as const;

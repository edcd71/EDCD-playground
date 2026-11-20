import type { ControlField } from "@/components/prototypes/control-panel";

export type Palette = {
  id: string;
  name: string;
  colors: readonly { label: string; className: string }[];
};

export const palettes: readonly Palette[] = [
  {
    id: "quiet",
    name: "Quiet afternoon",
    colors: [
      { label: "Clay", className: "bg-garden-quiet-1" },
      { label: "Sand", className: "bg-garden-quiet-2" },
      { label: "Leaf", className: "bg-garden-quiet-3" },
      { label: "Honey", className: "bg-garden-quiet-4" },
    ],
  },
  {
    id: "greenhouse",
    name: "Old greenhouse",
    colors: [
      { label: "Moss", className: "bg-garden-greenhouse-1" },
      { label: "Linen", className: "bg-garden-greenhouse-2" },
      { label: "Terracotta", className: "bg-garden-greenhouse-3" },
      { label: "Porcelain", className: "bg-garden-greenhouse-4" },
    ],
  },
  {
    id: "rain",
    name: "After the rain",
    colors: [
      { label: "Cloud", className: "bg-garden-rain-1" },
      { label: "Driftwood", className: "bg-garden-rain-2" },
      { label: "Mist", className: "bg-garden-rain-3" },
      { label: "Bark", className: "bg-garden-rain-4" },
    ],
  },
];

export const controls: readonly ControlField[] = [
  {
    type: "select",
    key: "palette",
    label: "Palette",
    options: palettes.map((palette) => ({ label: palette.name, value: palette.id })),
  },
];

"use client";

import { useControlSettings } from "@/components/prototypes/use-control-settings";
import { ColorGardenControls } from "./ColorGardenControls";
import { ColorGardenPreview } from "./ColorGardenPreview";
import { controls, palettes } from "./data";

export default function ColorGarden() {
  const settings = useControlSettings("color-garden", controls);
  const palette = palettes.find((item) => item.id === settings.values.palette) ?? palettes[0];
  return (
    <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-4 lg:grid-cols-[minmax(0,580px)_250px]">
      <ColorGardenPreview palette={palette} />
      <ColorGardenControls settings={settings} />
    </div>
  );
}

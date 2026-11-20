import { Badge } from "@/components/ui/badge";
import type { Palette } from "./data";

export function ColorGardenPreview({ palette }: { palette: Palette }) {
  return (
    <article className="prototype-panel">
      <Badge variant="outline">COLOR STUDY</Badge>
      <h1>Color garden</h1>
      <p>A little color story for a passing mood.</p>
      <h2 className="mt-7 font-serif text-xl text-foreground">{palette.name}</h2>
      <div
        className="palette-swatches"
        role="img"
        aria-label={`${palette.name}: ${palette.colors.map((color) => color.label).join(", ")}`}
      >
        {palette.colors.map((color) => (
          <span key={color.label} className={color.className} aria-hidden="true" />
        ))}
      </div>
      <p>{palette.colors.map((color) => color.label).join(" · ")}</p>
    </article>
  );
}

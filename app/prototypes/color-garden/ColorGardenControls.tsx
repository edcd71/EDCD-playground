"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { ControlPanel } from "@/components/prototypes/control-panel";
import { useControlSettings } from "@/components/prototypes/use-control-settings";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { controls } from "./data";

type Settings = ReturnType<typeof useControlSettings>;

export function ColorGardenControls({ settings }: { settings: Settings }) {
  const panel = (
    <ControlPanel
      title="Shape the palette"
      fields={controls}
      values={settings.values}
      onValueChange={settings.setValue}
      onReset={settings.reset}
      onRandomize={settings.randomize}
    />
  );

  return (
    <>
      <aside className="hidden lg:block" aria-label="Palette controls">
        {panel}
      </aside>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="mx-auto h-11 lg:hidden" aria-label="Adjust palette">
            <SlidersHorizontal aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Adjust palette</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="max-h-[85dvh] overflow-y-auto rounded-t-2xl px-5 pb-8 pt-6"
        >
          <SheetTitle className="sr-only">Palette controls</SheetTitle>
          <SheetDescription className="sr-only">
            Choose a palette or ask for a surprise.
          </SheetDescription>
          <SheetClose asChild>
            <Button
              className="absolute right-4 top-3 size-11"
              size="icon"
              variant="outline"
              aria-label="Close controls"
            >
              <X aria-hidden="true" />
            </Button>
          </SheetClose>
          <div className="mx-auto w-full max-w-xl">{panel}</div>
        </SheetContent>
      </Sheet>
    </>
  );
}

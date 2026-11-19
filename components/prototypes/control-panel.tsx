"use client";

import { RotateCcw, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ControlField =
  | {
      type: "select";
      key: string;
      label: string;
      options: readonly { label: string; value: string }[];
    }
  | { type: "range"; key: string; label: string; min: number; max: number; step?: number }
  | { type: "toggle"; key: string; label: string };

export type ControlValue = string | number | boolean;
export type ControlValues = Record<string, ControlValue>;

type ControlPanelProps = {
  title: string;
  fields: readonly ControlField[];
  values: ControlValues;
  onValueChange: (key: string, value: ControlValue) => void;
  onReset: () => void;
  onRandomize: () => void;
};

export function ControlPanel({
  title,
  fields,
  values,
  onValueChange,
  onReset,
  onRandomize,
}: ControlPanelProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-4 text-left">
      <h2 className="font-serif text-xl text-foreground">{title}</h2>
      <div className="mt-5 grid gap-5">
        {fields.map((field) => {
          const value = values[field.key];
          if (field.type === "select") {
            return (
              <label className="grid gap-2 text-sm text-foreground" key={field.key}>
                <span>{field.label}</span>
                <Select
                  value={typeof value === "string" ? value : ""}
                  onValueChange={(nextValue) => onValueChange(field.key, nextValue)}
                >
                  <SelectTrigger
                    className="h-11 w-full data-[size=default]:h-11"
                    aria-label={field.label}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
            );
          }

          if (field.type === "range") {
            const rangeValue = typeof value === "number" ? value : field.min;
            return (
              <label className="grid gap-2 text-sm text-foreground" key={field.key}>
                <span className="flex justify-between gap-3">
                  <span>{field.label}</span>
                  <output className="font-mono text-muted-foreground">{rangeValue}</output>
                </span>
                <input
                  className="h-11 w-full accent-primary"
                  type="range"
                  min={field.min}
                  max={field.max}
                  step={field.step ?? 1}
                  value={rangeValue}
                  aria-label={field.label}
                  onChange={(event) => onValueChange(field.key, event.currentTarget.valueAsNumber)}
                />
              </label>
            );
          }

          return (
            <label
              className="flex min-h-11 items-center justify-between gap-4 text-sm text-foreground"
              key={field.key}
            >
              <span>{field.label}</span>
              <input
                className="size-5 accent-primary"
                type="checkbox"
                checked={value === true}
                onChange={(event) => onValueChange(field.key, event.currentTarget.checked)}
              />
            </label>
          );
        })}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2">
        <Button variant="outline" className="h-11 px-2 sm:px-3" onClick={onReset}>
          <RotateCcw aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">Reset</span>
        </Button>
        <Button variant="outline" className="h-11 px-2 sm:px-3" onClick={onRandomize}>
          <Shuffle aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">Surprise me</span>
        </Button>
      </div>
    </section>
  );
}

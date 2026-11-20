"use client";

import { useEffect, useMemo, useState } from "react";
import type { ControlField, ControlValue, ControlValues } from "@/components/prototypes/control-panel";

function defaultsFor(fields: readonly ControlField[]): ControlValues {
  return Object.fromEntries(fields.map((field) => {
    if (field.type === "select") return [field.key, field.options[0]?.value ?? ""];
    if (field.type === "range") return [field.key, field.min];
    return [field.key, false];
  }));
}

function isValidValue(field: ControlField, value: unknown): value is ControlValue {
  if (field.type === "select") {
    return typeof value === "string" && field.options.some((option) => option.value === value);
  }
  if (field.type === "range") {
    return typeof value === "number" && Number.isFinite(value) && value >= field.min && value <= field.max;
  }
  return typeof value === "boolean";
}

function restoreValues(fields: readonly ControlField[], saved: unknown, defaults: ControlValues): ControlValues {
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) return defaults;
  const source = saved as Record<string, unknown>;
  return Object.fromEntries(fields.map((field) => [
    field.key,
    isValidValue(field, source[field.key]) ? source[field.key] : defaults[field.key],
  ])) as ControlValues;
}

export function useControlSettings(slug: string, fields: readonly ControlField[]) {
  const defaults = useMemo(() => defaultsFor(fields), [fields]);
  const storageKey = `fieldnotes:prototype:${slug}:settings:v1`;
  const [values, setValues] = useState<ControlValues>(defaults);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const restoreTimer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) setValues(restoreValues(fields, JSON.parse(saved), defaults));
      } catch {
        setValues(defaults);
      } finally {
        setReady(true);
      }
    }, 0);
    return () => window.clearTimeout(restoreTimer);
  }, [defaults, fields, storageKey]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(values));
    } catch {
      // The controls remain usable when browser storage is unavailable or full.
    }
  }, [ready, storageKey, values]);

  function setValue(key: string, value: ControlValue) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function reset() {
    setValues(defaults);
  }

  function randomize() {
    setValues((current) => Object.fromEntries(fields.map((field) => {
      const previous = current[field.key];
      if (field.type === "select") {
        const options = field.options.filter((option) => option.value !== previous);
        const choices = options.length ? options : field.options;
        return [field.key, choices[Math.floor(Math.random() * choices.length)]?.value ?? ""];
      }
      if (field.type === "range") {
        const step = field.step ?? 1;
        const count = Math.floor((field.max - field.min) / step) + 1;
        return [field.key, field.min + Math.floor(Math.random() * count) * step];
      }
      return [field.key, Math.random() >= 0.5];
    })));
  }

  return { values, setValue, reset, randomize };
}

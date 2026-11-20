"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { NoteList } from "./NoteList";
import type { TideNote } from "./types";

export default function TideNotes() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<TideNote[]>([]);
  const nextId = useRef(0);
  function addNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = note.trim();
    if (!value) return;
    setNotes((current) => [{ id: nextId.current++, text: value }, ...current]);
    setNote("");
  }
  return (
    <article className="prototype-panel">
      <Badge variant="outline">NOTICED TODAY · {notes.length} NOTES</Badge>
      <h1>Tide notes</h1>
      <p>Small observations have a way of adding up.</p>
      <form className="mx-auto mt-7 flex max-w-sm gap-2" onSubmit={addNote}>
        <label className="sr-only" htmlFor="tide-note">Write a small observation</label>
        <Input
          className="h-11"
          id="tide-note"
          value={note}
          maxLength={160}
          onChange={(event) => setNote(event.target.value)}
          placeholder="A small thing is enough…"
        />
        <Button aria-label="Save note" className="size-11" size="icon" disabled={!note.trim()}>
          <Plus aria-hidden="true" />
        </Button>
      </form>
      <NoteList notes={notes} />
    </article>
  );
}

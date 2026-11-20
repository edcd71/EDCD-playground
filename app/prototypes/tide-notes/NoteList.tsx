import type { TideNote } from "./types";

export function NoteList({ notes }: { notes: TideNote[] }) {
  return (
    <ul className="mx-auto mt-5 grid max-h-48 max-w-sm gap-2 overflow-auto text-left">
      {notes.length === 0 ? (
        <li className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
          Your first note is waiting.
        </li>
      ) : (
        notes.map((item, index) => (
          <li
            key={item.id}
            className={`tide-note-row ${index === 0 ? "tide-note-entering" : ""}`}
          >
            <div className="tide-note-inner rounded-lg bg-secondary px-3 py-3 text-left text-sm text-secondary-foreground">
              {item.text}
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

# Tide notes

## What It Does

Accepts short observations and adds them to a list for the current visit. Notes stay in component memory and disappear when leaving the route.

## Architecture

```text
[note form] -> [trim and validate input] -> [notes state] -> [animated list]
      ^                  |
      └──── clear input ─┘
```

## Frontend / API

- State: draft text, sequential note IDs, and the session-only list live in React state/ref.
- Shortcuts: Enter submits the form; there are no other shortcuts.
- Responsive: single centered card; the list scrolls vertically when it grows and the input/action fit a narrow screen.
- Request/response: none; notes are not sent to an API or saved in browser storage.

## AI Usage

None. No model is called.

## Key Dependencies

- React state and refs for the form and session list.
- Lucide React for the add action.
- Shared shadcn `Input`, `Badge`, and `Button` components.
- A route-scoped CSS animation for newly added rows; reduced-motion preferences disable it.

## Component Tree

```text
PrototypeRoute
└── TideNotes (page.tsx)
    ├── observation form
    └── NoteList (animated observation list)
```

## Error Handling

Blank input is ignored, whitespace is trimmed, and the input is capped at 160 characters. IDs are generated locally to keep list keys stable.

## File Structure

```text
tide-notes/
├── page.tsx       # form, ephemeral notes, and list
├── NoteList.tsx   # animated observation list
├── types.ts       # note shape
├── metadata.json
└── HOW_IT_WORKS.md
```

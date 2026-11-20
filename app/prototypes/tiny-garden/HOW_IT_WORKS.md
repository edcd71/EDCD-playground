# A tiny garden

## What It Does

Each press adds a little water and moves the seed through five growth stages. Progress is ephemeral; refresh to begin again.

## Architecture

```text
[Water button] -> [stage state] -> [stages and notes in data.ts] -> [garden card]
```

## Frontend / API

- State: the current stage is local React state and resets on refresh or route navigation.
- Shortcuts: none; use the water button.
- Responsive: single centered card; the growth illustration scales without changing layout width.
- Request/response: none; no API or network request is used.

## AI Usage

None. No model is called.

## Key Dependencies

- React state for the growth stage.
- Lucide React for the stage illustrations.
- Shared shadcn `Badge` and `Button` components.

## Component Tree

```text
PrototypeRoute
└── TinyGarden (page.tsx)
    └── growth card (stage icon, note, water action, progress marks)
```

## Error Handling

Growth is clamped to the final stage, where the button is disabled. Stage icons and notes use matching indexes from the local data file.

## File Structure

```text
tiny-garden/
├── page.tsx       # stage state and card
├── data.ts        # stage icons, notes, and display scales
├── metadata.json
└── HOW_IT_WORKS.md
```

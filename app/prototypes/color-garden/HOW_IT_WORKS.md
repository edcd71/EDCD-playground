# Color garden

## What It Does

Lets the visitor choose one of three authored color studies. The palette selector persists locally and includes Reset and Surprise me actions.

## Architecture

```text
[Control schema] -> [settings hook] <-> [namespaced localStorage]
                           |
                           v
                 [palette selection] -> [ColorGardenPreview]
                           ^
               [Reset / Surprise me]
```

## Frontend / API

- State: selected palette is validated and loaded after mount; changes save under `fieldnotes:prototype:color-garden:settings:v1`.
- Shortcuts: none; use the select menu or Reset / Surprise me controls.
- Responsive: controls sit beside the preview on desktop and open in a bottom sheet on smaller screens. Inputs and actions meet 44px touch sizing.
- Request/response: none; no API or network request is used.

## AI Usage

None. No model is called.

## Key Dependencies

- React state and effects for settings lifecycle.
- Shared `ControlPanel`, `useControlSettings`, shadcn `Select`, `Sheet`, and `Button` components.
- Tailwind palette tokens defined in `app/globals.css`; the prototype contains no inline color values.

## Component Tree

```text
PrototypeRoute
└── ColorGarden (page.tsx)
    ├── ColorGardenPreview
    └── ColorGardenControls
        ├── ControlPanel (desktop)
        └── Sheet -> ControlPanel (mobile)
```

## Error Handling

Invalid or unavailable local storage falls back to the first palette. Saved values are checked against the current schema. The interface still works if storage is blocked or full.

## File Structure

```text
color-garden/
├── page.tsx               # layout and settings wiring
├── ColorGardenControls.tsx # desktop panel and mobile sheet
├── ColorGardenPreview.tsx # palette display
├── data.ts                # palette and control schemas
├── metadata.json
└── HOW_IT_WORKS.md
```

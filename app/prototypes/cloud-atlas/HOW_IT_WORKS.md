# Cloud atlas

## What It Does

Shows three authored cloud observations with a simple illustration. It does not report live weather.

## Architecture

```text
[Next cloud button] -> [page index state] -> [observations in data.ts] -> [cloud card]
```

## Frontend / API

- State: the selected observation index lives in the page component and resets when the route unmounts.
- Shortcuts: none; use the “Look at another cloud” button.
- Responsive: a single centered card uses the shared prototype layout and wraps within the viewport.
- Request/response: none; no API, location, or network request is used.

## AI Usage

None. No model is called.

## Key Dependencies

- React state for cycling through observations.
- Lucide React for the cloud illustrations.
- Shared shadcn `Badge` and `Button` components.

## Component Tree

```text
PrototypeRoute
└── CloudAtlas (page.tsx)
    └── observation card (selected icon, name, note, next button)
```

## Error Handling

The observation list is static and has three entries. The index advances modulo the list length, so it always resolves to an existing observation.

## File Structure

```text
cloud-atlas/
├── page.tsx       # card and selection state
├── data.ts        # authored observations and icons
├── metadata.json  # gallery and privacy metadata
└── HOW_IT_WORKS.md
```

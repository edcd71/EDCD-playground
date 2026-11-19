# Soft focus

## What It Does

Runs a one-minute focus timer after the visitor presses Begin. It requests no notifications and stores no data.

## Architecture

```text
[Begin / Pause] -> [running state] -> [one-second interval] -> [seconds state]
                                              |                       |
                                      cleanup on route exit       [display]
```

## Frontend / API

- State: a reducer tracks remaining seconds and running status; the interval is cleared on pause, completion, or unmount.
- Shortcuts: none; use Begin, Pause, or Another minute.
- Responsive: one centered card with a large tabular timer and 44px actions.
- Request/response: none; no API or network request is used.

## AI Usage

None. No model is called.

## Key Dependencies

- React state and effects for timer lifecycle.
- A pure timer reducer and formatter in `timer.ts`.
- Lucide React for play, pause, and restart actions.
- Shared shadcn `Badge` and `Button` components.

## Component Tree

```text
PrototypeRoute
└── SoftFocus (page.tsx)
    ├── timer display
    └── Begin / Pause / Another minute action
```

## Error Handling

The countdown clamps at zero and stops. The effect clears its interval when the timer pauses or the component unmounts.

## File Structure

```text
soft-focus/
├── page.tsx       # timer state, interval, and display
├── timer.ts       # reducer and time formatter
├── metadata.json
└── HOW_IT_WORKS.md
```

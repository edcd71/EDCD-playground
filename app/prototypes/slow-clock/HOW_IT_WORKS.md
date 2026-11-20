# The slow clock

## What It Does

Shows the visitor’s current local time in a large, quiet display, refreshed every 15 seconds. It uses the browser clock and does not request location.

## Architecture

```text
[mount] -> [format local browser time] -> [time state] -> [clock display]
                 ^                           |
                 └──── 15 second interval ───┘
```

## Frontend / API

- State: `useSyncExternalStore` reads the browser’s local time after hydration, refreshes every 15 seconds, and clears its subscription on unmount.
- Shortcuts: none; the clock is read-only.
- Responsive: the time scales within a single centered card and uses tabular numerals.
- Request/response: none; no API, location, or network request is used.

## AI Usage

None. No model is called.

## Key Dependencies

- React `useSyncExternalStore` for the browser clock subscription.
- `Intl.DateTimeFormat` and the visitor’s browser clock.
- Shared shadcn `Badge` and the site’s semantic theme tokens.

## Component Tree

```text
PrototypeRoute
└── SlowClock (page.tsx)
    └── local time display
```

## Error Handling

If browser time formatting fails, the browser surfaces the runtime error; there is no external data source to fail. The interval cleanup prevents a timer from surviving route navigation.

## File Structure

```text
slow-clock/
├── page.tsx       # local time state and display
├── metadata.json
└── HOW_IT_WORKS.md
```

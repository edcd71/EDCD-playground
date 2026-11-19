import * as React from "react"

const MOBILE_BREAKPOINT = 768

const subscribe = (onChange: () => void) => {
  const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
  mediaQuery.addEventListener("change", onChange)
  return () => mediaQuery.removeEventListener("change", onChange)
}

const getSnapshot = () => window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
const getServerSnapshot = () => false

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

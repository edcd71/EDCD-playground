export type FocusTimerState = { seconds: number; running: boolean };
export type FocusTimerAction = { type: "start" | "pause" | "tick" | "restart" };

export const initialFocusTimer: FocusTimerState = { seconds: 60, running: false };

export function focusTimerReducer(
  state: FocusTimerState,
  action: FocusTimerAction,
): FocusTimerState {
  switch (action.type) {
    case "start":
      return { ...state, running: state.seconds > 0 };
    case "pause":
      return { ...state, running: false };
    case "tick": {
      if (!state.running) return state;
      const seconds = Math.max(state.seconds - 1, 0);
      return { seconds, running: seconds > 0 };
    }
    case "restart":
      return initialFocusTimer;
  }
}

export function formatCountdown(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

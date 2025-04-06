import { useState } from "react";
import { createSafeContext } from "./createSafeContext";
import { useMemo } from "../@lib/hooks";

interface Props {
  children: React.ReactNode;
}

function ThemeProvider({ children }: Props) {
  const [state, setState] = useState<ContextState>({
    theme: "light",
  });

  const actions = useMemo(
    () => ({
      toggleTheme() {
        setState((prev) => ({
          ...prev,
          theme: prev.theme === "light" ? "dark" : "light",
        }));
      },
    }),
    []
  );

  return (
    <ThemeStateProvider {...state}>
      <ThemeActionsProvider {...actions}>{children}</ThemeActionsProvider>
    </ThemeStateProvider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Context API
 * -----------------------------------------------------------------------------------------------*/
interface ContextState {
  theme: "dark" | "light";
}

interface ContextActions {
  toggleTheme(): void;
}

export const [ThemeStateProvider, useThemeStateContext] =
  createSafeContext<ContextState>("ThemeProvider");
export const [ThemeActionsProvider, useThemeActionsContext] =
  createSafeContext<ContextActions>("ThemeProvider");

export default ThemeProvider;

import { useState } from "react";
import { createSafeContext } from "./createSafeContext";
import { useMemo } from "../@lib/hooks";

interface Props {
  children?: React.ReactNode;
}

function AccountProvider({ children }: Props) {
  const [state, setState] = useState<ContextState>({
    user: null,
  });

  const actions = useMemo<ContextActions>(
    () => ({
      login(email) {
        const DUMMY_USER = {
          email,
          id: 1,
          name: "홍길동",
        };

        setState((prev) => ({
          ...prev,
          user: DUMMY_USER,
        }));
      },

      logout() {
        setState((prev) => ({
          ...prev,
          user: null,
        }));
      },
    }),
    []
  );

  return (
    <AccountStateProvider {...state}>
      <AccountActionsProvider {...actions}>{children}</AccountActionsProvider>
    </AccountStateProvider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

export interface IUser {
  id: number;
  name: string;
  email: string;
}

/* -------------------------------------------------------------------------------------------------
 * Context API
 * -----------------------------------------------------------------------------------------------*/

interface ContextState {
  user: IUser | null;
}

interface ContextActions {
  login(email: string, password: string): void;
  logout(): void;
}

export const [AccountStateProvider, useAccountStateContext] =
  createSafeContext<ContextState>("AccountProvider");
export const [AccountActionsProvider, useAccountActionsContext] =
  createSafeContext<ContextActions>("AccountProvider");

export default AccountProvider;

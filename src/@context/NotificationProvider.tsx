import { useState } from "react";
import { createSafeContext } from "./createSafeContext";
import { useMemo } from "../@lib/hooks";

interface Props {
  children: React.ReactNode;
}

function NotificationProvider({ children }: Props) {
  const [state, setState] = useState<ContextState>({
    notifications: [],
  });

  const actions = useMemo<ContextActions>(
    () => ({
      addNotification(type, message) {
        const newNotification: INotification = {
          id: Date.now(),
          type,
          message,
        };

        setState((prev) => ({
          notifications: [...prev.notifications, newNotification],
        }));
      },

      removeNotification(id) {
        setState((prev) => ({
          notifications: prev.notifications.filter((notification) => notification.id !== id),
        }));
      },
    }),
    []
  );

  return (
    <NotificationStateProvider {...state}>
      <NotificationActionsProvider {...actions}>{children}</NotificationActionsProvider>
    </NotificationStateProvider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

export interface INotification {
  id: number;
  type: "info" | "success" | "warning" | "error";
  message: string;
}

/* -------------------------------------------------------------------------------------------------
 * Context API
 * -----------------------------------------------------------------------------------------------*/
interface ContextState {
  notifications: INotification[];
}

interface ContextActions {
  addNotification(type: INotification["type"], message: string): void;
  removeNotification(id: number): void;
}

export const [NotificationStateProvider, useNotificationStateContext] =
  createSafeContext<ContextState>("NotificationProvider");
export const [NotificationActionsProvider, useNotificationActionsContext] =
  createSafeContext<ContextActions>("NotificationProvider");

export default NotificationProvider;

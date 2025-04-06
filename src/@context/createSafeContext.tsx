import { createContext, useContext } from "react";
import { useMemo } from "../@lib/hooks";

export function createSafeContext<T extends object | null>(
  rootComponentName: string,
  defaultValue?: T
) {
  const Context = createContext<T | undefined>(defaultValue);

  const Provider = ({ children, ...rest }: React.PropsWithChildren<T>) => {
    // eslint-disable-next-line
    const value = useMemo(() => rest, Object.values(rest)) as T;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useSafeContext = (consumerName: string) => {
    const ctx = useContext(Context);
    if (ctx === undefined) {
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return ctx;
  };

  Provider.displayName = rootComponentName + "Provider";

  return [Provider, useSafeContext] as const;
}

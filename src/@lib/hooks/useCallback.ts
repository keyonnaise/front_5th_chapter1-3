/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList } from "react";
import { useRef } from "./useRef";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList
) {
  const factoryRef = useRef(factory);

  // 직접 작성한 useMemo를 통해서 만들어보세요.
  const memorizedFn = useMemo(() => () => factoryRef.current(), _deps);
  return memorizedFn;
}

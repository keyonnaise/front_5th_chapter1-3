/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, useMemo } from "react";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList
) {
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  const memorizedFn = useMemo(() => () => factory(), [factory, ..._deps]);
  return memorizedFn;
}

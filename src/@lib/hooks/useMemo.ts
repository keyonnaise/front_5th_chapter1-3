import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  const memorized = useRef<{ value: T; deps: DependencyList }>();

  if (!memorized.current || !_equals(_deps, memorized.current.deps)) {
    memorized.current = {
      value: factory(),
      deps: _deps,
    };
  }

  return memorized.current.value;
}

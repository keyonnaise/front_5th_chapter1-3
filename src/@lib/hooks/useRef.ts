import { MutableRefObject, useState } from "react";

export function useRef<T = undefined>(): MutableRefObject<T | undefined>;
export function useRef<T>(initialValue: T): MutableRefObject<T>;
export function useRef<T>(
  initialValue?: T,
): MutableRefObject<T | undefined> | MutableRefObject<T> {
  // React의 useState를 이용해서 만들어보세요.
  return useState(() => ({ current: initialValue }))[0];
}

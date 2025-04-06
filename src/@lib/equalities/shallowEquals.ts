import { isObject } from "../utils";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    return objA.every((current, i) => current === objB[i]);
  }

  if (isObject(objA) && isObject(objB)) {
    const objAKeys = Object.keys(objA) as (keyof typeof objA)[];
    const objBKeys = Object.keys(objB) as (keyof typeof objB)[];

    if (objAKeys.length !== objBKeys.length) {
      return false;
    }

    return objAKeys.every((key) => objA[key] === objB[key]);
  }

  return false;
}

/**
 * @description
 * 외부(예: 클라이언트)로부터 JSON 데이터를 받아 Node.js 서버에서 처리할 때 주의사항
 *
 * 클라이언트로부터 받은 JSON 문자열을 `JSON.parse()`를 통해 객체로 변환할 때,
 * 이 객체의 프로토타입 체인이 예상과 다를 수 있습니다.
 * 악의적이거나 잘못된 형식의 JSON은 `Object.create(null)`을 사용한 것처럼
 * 프로토타입이 없는 객체를 만들거나, `Object.prototype`의 메소드(예: `hasOwnProperty`)와
 * 동일한 이름의 속성을 직접 가질 수 있습니다. 이를 '프로토타입 메소드 섀도잉(shadowing)'이라고 합니다.
 *
 * 이렇게 되면, 해당 객체에서 `obj.hasOwnProperty('property')`와 같이
 * `Object.prototype`의 메소드를 직접 호출하려 할 때 런타임 에러가 발생하거나
 * (해당 메소드가 없거나 함수가 아닌 경우) 의도치 않은 결과를 반환할 수 있습니다.
 *
 * @summary
 * 객체의 출처를 신뢰할 수 없을 때는 `obj.method()` 형태의 직접적인 프로토타입 메소드 호출 대신,
 * `Object.prototype.method.call(obj, ...)` 또는 최신 `Object.hasOwn(obj, prop)`과 같은
 * 안전한 방법을 사용해야 합니다. Optional Chaining은 nullish 체크만 하므로 섀도잉 문제의 완전한 해결책이 아닙니다.
 */
export function hasOwn(obj: object, key: PropertyKey) {
  return Object.prototype.hasOwnProperty.call(obj || {}, key);
}

export function isObject(value?: unknown): value is object {
  return value !== null && typeof value === "object";
}

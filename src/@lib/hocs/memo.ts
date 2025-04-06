import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  const MemorizedComponent = (props: P) => {
    const prevProps = useRef<P>();
    const prevElement = useRef<React.ReactElement>();

    if (!_equals(props, prevProps.current)) {
      prevProps.current = props;
      prevElement.current = createElement(Component, props);
    }

    return prevElement.current;
  };

  return MemorizedComponent;
}

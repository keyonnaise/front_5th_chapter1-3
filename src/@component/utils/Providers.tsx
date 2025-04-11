import { createElement } from "react";

type ProviderType<
  T extends React.ElementType = React.FunctionComponent,
  P = React.ComponentPropsWithoutRef<T>,
> = [T, P];

interface Props {
  providers: ProviderType[];
  children: React.ReactNode;
}

function Providers({ providers, children }: Props) {
  return (
    <>
      {providers.reduceRight((children, [Provider, props]) => {
        return createElement(Provider, props, children);
      }, children)}
    </>
  );
}

export default Providers;

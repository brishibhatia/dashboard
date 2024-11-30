declare module 'next/link' {
  import { LinkProps as NextLinkProps } from 'next/dist/client/link';
  import * as React from 'react';

  type LinkProps = Omit<NextLinkProps, 'href'> & {
    href: string;
    children?: React.ReactNode;
  };

  export default function Link(props: LinkProps): JSX.Element;
}

declare module 'next/navigation' {
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    refresh: () => void;
    back: () => void;
  };
} 
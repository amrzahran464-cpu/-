declare module 'next' {
  export interface Metadata {
    title?: string | { default: string; template: string };
    description?: string;
    metadataBase?: URL;
    alternates?: {
      canonical?: string;
    };
    openGraph?: {
      title?: string;
      description?: string;
      url?: string;
      siteName?: string;
      locale?: string;
      type?: string;
    };
    twitter?: {
      card?: string;
      title?: string;
      description?: string;
    };
  }

  export interface Viewport {
    themeColor?: string;
    width?: string;
    initialScale?: number;
  }
}

declare module 'next/image' {
  import React from 'react';
  export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    src: string;
    alt: string;
    width?: number | `${number}`;
    height?: number | `${number}`;
    fill?: boolean;
    priority?: boolean;
    quality?: number;
    unoptimized?: boolean;
    className?: string;
  }
  const Image: React.FC<ImageProps>;
  export default Image;
}

declare module 'next/link' {
  import React from 'react';
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
    prefetch?: boolean;
  }
  const Link: React.FC<LinkProps>;
  export default Link;
}

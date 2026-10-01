import React, { useState } from 'react';

export interface NextImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
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

export default function Image({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  className = '',
  style,
  ...rest
}: NextImageProps) {
  const [hasError, setHasError] = useState(false);

  const fillStyles: React.CSSProperties = fill
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }
    : {};

  if (hasError) {
    return (
      <div
        className={`bg-neutral-100 text-neutral-400 flex items-center justify-center text-xs p-4 border border-neutral-200 ${className}`}
        style={{
          ...fillStyles,
          ...style,
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
        }}
      >
        <span className="text-center font-medium">{alt || 'صورة توضيحية'}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setHasError(true)}
      referrerPolicy="no-referrer"
      style={{
        ...fillStyles,
        ...style,
      }}
      className={className}
      {...rest}
    />
  );
}

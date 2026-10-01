import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'emerald' | 'amber' | 'blue';
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-neutral-900 text-white',
    secondary: 'bg-neutral-100 text-neutral-800',
    outline: 'border border-neutral-300 text-neutral-800 bg-white',
    emerald: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80',
    amber: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    blue: 'bg-blue-50 text-blue-800 border border-blue-200/80',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold leading-none tracking-tight transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

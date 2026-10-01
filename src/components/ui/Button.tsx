import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'emerald';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      isLoading = false,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98] select-none';

    const variants = {
      default: 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm hover:shadow',
      emerald: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md',
      secondary: 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200/80',
      outline: 'border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50 shadow-xs',
      ghost: 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
      link: 'text-emerald-700 underline-offset-4 hover:underline p-0 h-auto font-medium',
    };

    const sizes = {
      default: 'h-11 px-5 py-2.5',
      sm: 'h-9 rounded-lg px-3.5 text-xs',
      lg: 'h-13 rounded-2xl px-8 text-base font-extrabold',
      icon: 'h-10 w-10',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

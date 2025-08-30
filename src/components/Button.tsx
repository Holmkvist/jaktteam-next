import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        // Base styles
        'rounded-md font-semibold focus-visible:outline-2 focus-visible:outline-offset-2',
        // Variants
        variant === 'primary' &&
          'bg-indigo-600 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500',
        variant === 'secondary' &&
          'bg-white text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:inset-ring-gray-950 dark:hover:bg-gray-700',
        // Sizes
        size === 'xs' && 'rounded-sm px-2 py-1 text-xs',
        size === 'sm' && 'rounded-sm px-2 py-1 text-sm',
        size === 'md' && 'rounded-md px-2.5 py-1.5 text-sm',
        size === 'lg' && 'rounded-md px-3 py-2 text-sm',
        size === 'xl' && 'rounded-md px-3.5 py-2.5 text-sm',
        className,
      )}
    >
      {children}
    </button>
  );
}

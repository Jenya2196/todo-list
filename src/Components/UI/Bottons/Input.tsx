import React from 'react';
import clsx from 'clsx';

type InputProps = {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  multiline?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

function Input({
  label,
  error,
  size = 'md',
  multiline,
  className,
  ...props
}: InputProps) {
  const baseStyles =
    'block w-full rounded-md border focus:outline-none focus:ring-2 transition-colors duration-200';

  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  const normalStyles =
    'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500';

  const errorStyles = 'border-red-500 focus:ring-red-500 focus:border-red-500';

  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium">{label}</label>}

      {multiline ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={clsx(
            baseStyles,
            sizes[size],
            error ? errorStyles : normalStyles,
            className
          )}
        />
      ) : (
        <input
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          className={clsx(
            baseStyles,
            sizes[size],
            error ? errorStyles : normalStyles,
            className
          )}
        />
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default Input;

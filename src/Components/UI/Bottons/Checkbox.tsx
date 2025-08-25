import React from 'react';
import clsx from 'clsx';

type CheckboxProps = {
  label?: string;
  checked?: boolean;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Checkbox({
  label,
  checked,
  error,
  className,
  ...props
}: CheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        {...props}
        className={clsx(
          'h-4 w-4 rounded border-gray-300 text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:checked:bg-blue-500',
          error && 'border-red-500',
          className
        )}
      />
      {label && <label className="text-sm font-medium">{label}</label>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default Checkbox;

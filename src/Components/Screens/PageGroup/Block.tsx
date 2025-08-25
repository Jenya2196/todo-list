'use client';
import Button from '@/Components/UI/Bottons/Button';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onDelete?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

function Block({ children, className, onDelete, ...props }: Props) {
  return (
    <div
      {...props}
      className={clsx(
        'flex justify-between items-center gap-2 border rounded p-2 hover:cursor-pointer',
        className
      )}
    >
      <div className="truncate">{children}</div>
      <div className="flex gap-2">
        <Button variant="danger" onClick={onDelete}>
          <Trash className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}

export default Block;

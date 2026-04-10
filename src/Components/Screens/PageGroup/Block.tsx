'use client';

import { Button } from '@/components/ui';
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
        'flex items-center justify-between gap-2 rounded-lg border px-2 py-1 hover:cursor-pointer',
        className
      )}
    >
      <div className="truncate">{children}</div>
      <div className="flex gap-2">
        <Button variant={'destructive'} onClick={onDelete} size={'icon-sm'}>
          <Trash />
        </Button>
      </div>
    </div>
  );
}

export default Block;

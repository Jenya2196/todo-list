import React, { ReactNode, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '.';

type Props = {
  title?: string;
  children: ReactNode;
  selectTitle?: string;
  onSelect?: () => void;
  onClose: () => void;
};

function Modal({ title, children, selectTitle, onSelect, onClose }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-30 flex h-full w-full items-center justify-center bg-black/40 p-4"
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div
        className={`relative grid max-h-[90vh] min-h-[50vh] w-full max-w-md grid-rows-[auto_1fr_auto] gap-4 overflow-hidden rounded-lg bg-white p-2 shadow-lg sm:max-w-lg md:max-w-2xl dark:bg-zinc-900`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full p-1 transition hover:bg-black/10 hover:dark:bg-white/10"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        {title && (
          <div className="border-b border-black/30 p-2 pr-10 font-bold lg:text-2xl dark:border-white/30">
            {title}
          </div>
        )}

        <div className="space-y-2 overflow-y-auto p-2">{children}</div>

        {selectTitle && (
          <div className="flex justify-end border-t border-black/30 p-2 dark:border-white/30">
            <Button
              onClick={() => {
                if (onSelect) onSelect();
              }}
            >
              {selectTitle}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;

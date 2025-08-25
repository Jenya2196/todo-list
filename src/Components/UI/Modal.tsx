import React, { ReactNode, useRef } from 'react';
import { X } from 'lucide-react';
import Button from './Bottons/Button';

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
      className="fixed z-30 top-0 left-0 bg-black/40 h-full w-full flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div
        className={`relative grid grid-rows-[auto_1fr_auto] p-2 w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] min-h-[50vh] bg-white dark:bg-zinc-900 rounded-lg shadow-lg gap-4 overflow-hidden`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-black/10 hover:dark:bg-white/10 transition"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {title && (
          <div className="lg:text-2xl font-bold border-b border-black/30 dark:border-white/30 p-2 pr-10">
            {title}
          </div>
        )}

        <div className="overflow-y-auto p-2 space-y-2 ">{children}</div>

        {selectTitle && (
          <div className="flex p-2 justify-end border-t border-black/30 dark:border-white/30">
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

'use client';

import { useState, useRef, useEffect } from 'react';

interface Props {
  select: { id: number; name: string };
  data: { id: number; name: string }[];
  onSelect: ({ id, name }: { id: number; name: string }) => void;
  label?: string;
}

export default function Select({ select, data, onSelect, label }: Props) {
  const [selected, setSelected] = useState(select || null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие при клике вне компонента
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    setSelected(select);
  }, [select]);

  if (!selected) return <></>;

  return (
    <div ref={dropdownRef} className="relative w-full space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative m-0 cursor-pointer w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900 transition-colors"
      >
        <span className="block truncate text-gray-900 dark:text-gray-100">
          {selected.name}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-5-5 1.414-1.414L10 9.586l4.293-4.293 1.414 1.414-5 5A1 1 0 0110 12z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-20 mt-1 max-h-60 left-0 w-full overflow-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
          {data.map((person) => (
            <li
              key={person.id}
              onClick={() => {
                setSelected(person);
                onSelect(person);
                setIsOpen(false);
              }}
              className={`cursor-pointer select-none py-2 pl-3 pr-3 transition-colors
                ${
                  person.id === selected.id
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-gray-900 dark:text-gray-100 hover:bg-blue-500 hover:text-white'
                }`}
            >
              <span className="block truncate">{person.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

'use client';
import Select from '@/Components/UI/Bottons/Select';
import React, { useEffect, useState } from 'react';

type StyleType = {
  name: string;
  id: number;
};

const styleData: StyleType[] = [
  { name: 'dark', id: 1 },
  { name: 'light', id: 2 },
];

function Header() {
  const [style, setStyle] = useState<StyleType>(styleData[0]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const matchedStyle =
      styleData.find((elem) => elem.name === savedTheme) || styleData[1];

    setStyle(matchedStyle);

    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(matchedStyle.name);
  }, []);

  return (
    <div className="w-full h-full border-b shadow-md dark:shadow-white/20">
      <div className="p-2 flex items-center justify-between">
        <div className="font-bold text-2xl">Todo List</div>
        <div>
          <Select
            select={style}
            onSelect={(e: StyleType) => {
              console.log(e);

              setStyle(e);
              localStorage.setItem('theme', e.name);

              document.documentElement.classList.remove('light', 'dark');
              document.documentElement.classList.add(e.name);
            }}
            data={styleData}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;

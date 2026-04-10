'use client';

import { Button } from '@/components/ui';
import { useTheme } from 'next-themes';
import React from 'react';

function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-full w-full border-b shadow-md dark:shadow-white/20">
      <div className="flex items-center justify-between p-2">
        <div className="text-2xl font-bold">Todo List</div>
        <div>
          <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;

'use client';

import { Button } from '@/components/ui';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme) return null; // 💥 ключевой момент

  return (
    <div className="h-full w-full border-b shadow-md dark:shadow-white/20">
      <div className="flex items-center justify-between px-10 py-2">
        <div className="text-2xl font-bold">Todo List</div>
        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </Button>
      </div>
    </div>
  );
}

export default Header;

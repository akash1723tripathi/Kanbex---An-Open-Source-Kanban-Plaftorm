'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative flex items-center w-[52px] h-[28px] rounded-full p-[3px] transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        isDark
          ? 'bg-gray-700 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4),inset_-1px_-1px_3px_rgba(255,255,255,0.05),2px_2px_6px_rgba(0,0,0,0.3)] focus-visible:ring-gray-500 focus-visible:ring-offset-gray-800'
          : 'bg-gray-100 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.08),inset_-2px_-2px_4px_rgba(255,255,255,0.9),3px_3px_6px_rgba(0,0,0,0.08),-2px_-2px_4px_rgba(255,255,255,0.8)] focus-visible:ring-gray-400 focus-visible:ring-offset-white'
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Icons - Sun and Moon sit at each end */}
      <span
        className={cn(
          'absolute left-[7px] top-1/2 -translate-y-1/2 transition-opacity duration-300',
          isDark ? 'opacity-30' : 'opacity-80'
        )}
      >
        <Sun className="size-3.5 text-amber-500" />
      </span>
      <span
        className={cn(
          'absolute right-[7px] top-1/2 -translate-y-1/2 transition-opacity duration-300',
          isDark ? 'opacity-90' : 'opacity-30'
        )}
      >
        <Moon className="size-3.5 text-indigo-400" />
      </span>

      {/* Sliding Knob */}
      <span
        className={cn(
          'relative z-10 flex items-center justify-center size-[22px] rounded-full transition-all duration-300 ease-in-out',
          isDark
            ? 'translate-x-[24px] bg-gray-800 shadow-[2px_2px_4px_rgba(0,0,0,0.4),-1px_-1px_3px_rgba(255,255,255,0.06)]'
            : 'translate-x-0 bg-white shadow-[2px_2px_5px_rgba(0,0,0,0.12),-2px_-2px_4px_rgba(255,255,255,0.9)]'
        )}
      >
        {isDark ? (
          <Moon className="size-3 text-indigo-300" />
        ) : (
          <Sun className="size-3 text-amber-500" />
        )}
      </span>
    </button>
  );
}

export default ThemeToggle;

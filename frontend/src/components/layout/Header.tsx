'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Lightbulb,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { ThemeToggle } from './ThemeToggle';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  showBackButton?: boolean;
  className?: string;
}

export function Header({
  breadcrumbs = [],
  showBackButton = true,
  className,
}: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
  };

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      className={cn(
        'flex items-center justify-between border rounded-lg px-4 py-2 transition-colors duration-300',
        isDark
          ? 'bg-[#1e2533] border-[#2e3548]'
          : 'bg-white border-gray-100',
        className
      )}
    >
      {/* Left Side - Breadcrumb Navigation */}
      <div className="flex items-center gap-2">
        {/* Back Button */}
        {showBackButton && (
          <button
            onClick={handleBack}
            className={cn(
              'flex items-center justify-center p-2 border rounded-lg transition-colors',
              isDark
                ? 'bg-[#252d3d] border-[#2e3548] hover:bg-[#2e3548]'
                : 'bg-white border-gray-100 hover:bg-gray-50'
            )}
            aria-label="Go back"
          >
            <ArrowLeft className={cn('size-3.5', isDark ? 'text-gray-400' : 'text-gray-500')} />
          </button>
        )}

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2" aria-label="Breadcrumb">
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span className={cn('text-base', isDark ? 'text-gray-500' : 'text-gray-500')}>/</span>
                )}
                <span className={cn('text-base leading-5', isDark ? 'text-gray-400' : 'text-gray-500')}>
                  {item.label}
                </span>
              </div>
            ))}
          </nav>
        )}
      </div>

      {/* Right Side - User Info */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle - Neumorphic Switch */}
        <ThemeToggle />

        {/* Updates/What's New Icon */}
        <button
          className={cn(
            'flex items-center justify-center p-2.5 rounded transition-colors',
            isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
          )}
          aria-label="What's new"
        >
          <Lightbulb className={cn('size-6', isDark ? 'text-gray-400' : 'text-gray-500')} />
        </button>

        {/* Notifications Icon */}
        <button
          className={cn(
            'flex items-center justify-center p-2.5 rounded transition-colors',
            isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
          )}
          aria-label="Notifications"
        >
          <Bell className={cn('size-6', isDark ? 'text-gray-400' : 'text-gray-500')} />
        </button>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={cn(
              'flex items-center gap-3 rounded-lg p-1.5 transition-colors',
              isDark
                ? 'bg-transparent hover:bg-white/5'
                : 'bg-white hover:bg-gray-50'
            )}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            {/* Avatar */}
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="size-8 rounded-full object-cover"
              />
            ) : (
              <div className={cn(
                'size-8 rounded-full flex items-center justify-center text-xs font-medium',
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
              )}>
                {user?.name ? getInitials(user.name) : 'U'}
              </div>
            )}

            {/* User Name */}
            <span className={cn('text-base leading-5', isDark ? 'text-gray-300' : 'text-gray-700')}>
              {user?.name || 'User'}
            </span>

            {/* Chevron */}
            <ChevronDown
              className={cn(
                'size-6 transition-transform duration-200',
                isDark ? 'text-gray-500' : 'text-gray-400',
                dropdownOpen && 'rotate-180'
              )}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className={cn(
              'absolute right-0 top-full mt-2 w-48 border rounded-lg shadow-dropdown py-1 z-50 animate-fade-in',
              isDark
                ? 'bg-[#1e2533] border-[#2e3548]'
                : 'bg-white border-gray-100'
            )}>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  router.push('/profile');
                }}
                className={cn(
                  'flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors',
                  isDark ? 'text-gray-300 hover:bg-white/5' : 'text-body hover:bg-gray-50'
                )}
              >
                <User className={cn('size-4', isDark ? 'text-gray-500' : 'text-gray-500')} />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  router.push('/settings');
                }}
                className={cn(
                  'flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors',
                  isDark ? 'text-gray-300 hover:bg-white/5' : 'text-body hover:bg-gray-50'
                )}
              >
                <Settings className={cn('size-4', isDark ? 'text-gray-500' : 'text-gray-500')} />
                <span>Settings</span>
              </button>
              <div className={cn('border-t my-1', isDark ? 'border-[#2e3548]' : 'border-gray-100')} />
              <button
                onClick={handleLogout}
                className={cn(
                  'flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors',
                  isDark ? 'text-gray-300 hover:bg-white/5' : 'text-body hover:bg-gray-50'
                )}
              >
                <LogOut className={cn('size-4', isDark ? 'text-gray-500' : 'text-gray-500')} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

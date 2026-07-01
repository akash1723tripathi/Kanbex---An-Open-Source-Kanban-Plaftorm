'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { NewProjectModal } from '@/components/project';
import { createProject } from '@/lib/api/projects';
import { ThemeProvider, useTheme } from '@/hooks';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AppShellProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  showBackButton?: boolean;
}

function AppShellInner({
  children,
  breadcrumbs = [],
  showBackButton = true,
}: AppShellProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isDark } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);

  // Create project mutation
  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: (newProject) => {
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setNewProjectModalOpen(false);
      // Navigate to the new project
      router.push(`/projects/${newProject.id}`);
    },
  });

  const handleCreateProject = async (data: { name: string; description: string }) => {
    await createMutation.mutateAsync(data);
  };

  // Close mobile menu on route change or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <div
      className={cn(
        'dashboard-theme-wrapper flex h-screen overflow-hidden',
        isDark ? 'dark bg-[#141922]' : 'bg-page'
      )}
    >
      {/* Desktop Sidebar - Hidden on mobile */}
      <Sidebar
        className="hidden lg:flex flex-shrink-0"
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNewProject={() => setNewProjectModalOpen(true)}
      />

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ease-in-out',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar
          isMobile
          onClose={() => setMobileMenuOpen(false)}
          onNewProject={() => {
            setMobileMenuOpen(false);
            setNewProjectModalOpen(true);
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 p-4 pb-0">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                'flex items-center justify-center p-2 border rounded-lg transition-colors lg:hidden',
                isDark
                  ? 'bg-[#1e2533] border-[#2e3548] hover:bg-[#252d3d] text-gray-400'
                  : 'bg-white border-gray-100 hover:bg-gray-50'
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5 text-gray-500" />
            </button>

            {/* Header Component */}
            <Header
              breadcrumbs={breadcrumbs}
              showBackButton={showBackButton}
              className="flex-1"
            />
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>

      {/* New Project Modal (triggered from sidebar) */}
      <NewProjectModal
        open={newProjectModalOpen}
        onOpenChange={setNewProjectModalOpen}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}

export function AppShell(props: AppShellProps) {
  return (
    <ThemeProvider>
      <AppShellInner {...props} />
    </ThemeProvider>
  );
}

export default AppShell;

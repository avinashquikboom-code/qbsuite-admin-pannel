'use client';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Toaster } from '@/components/common/Toast';
import { TooltipProvider } from '@/components/common/Tooltip';
export function MainLayout({ children }) {
 return <TooltipProvider><div className="flex h-dvh overflow-hidden bg-background text-foreground font-sans"><div className="hidden lg:flex shrink-0"><Sidebar /></div><div className="flex min-w-0 flex-1 flex-col"><Header /><main id="main-content" className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main></div></div><Toaster position="top-right" /></TooltipProvider>;
}

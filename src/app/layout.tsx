import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'QB Suite Admin | Enterprise HRM & CRM Portal',
  description:
    'Unified Enterprise Management Portal for Human Resources, Payroll, Sales CRM, and Operations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-slate-50 text-slate-800 flex overflow-hidden font-sans">
        <TooltipProvider>
          {/* Desktop Sidebar */}
          <div className="hidden lg:flex shrink-0 h-full">
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
            <TopNav />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>

          {/* Sonner Toast Notifications */}
          <Toaster position="top-right" richColors />
        </TooltipProvider>
      </body>
    </html>
  )
}

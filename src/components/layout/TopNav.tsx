'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  RiMenuLine,
  RiSearchLine,
  RiNotification3Line,
  RiBuilding4Line,
  RiBriefcaseLine,
  RiApps2Line,
  RiUser3Line,
  RiSettings4Line,
  RiLogoutBoxRLine,
  RiCheckDoubleLine,
} from '@remixicon/react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Sidebar } from '@/components/layout/Sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/hooks/use-toast'

export function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')

  const currentModule = React.useMemo(() => {
    if (pathname.startsWith('/crm')) return 'CRM'
    if (
      pathname.startsWith('/hrm') ||
      pathname.startsWith('/employees') ||
      pathname.startsWith('/attendance') ||
      pathname.startsWith('/overtime') ||
      pathname.startsWith('/expenses') ||
      pathname.startsWith('/payroll') ||
      pathname.startsWith('/announcements')
    ) {
      return 'HRM'
    }
    return 'Suite'
  }, [pathname])

  const notifications = [
    {
      id: 1,
      title: 'New Overtime Request',
      time: '10m ago',
      desc: 'Sarah Jenkins applied for 4.5h overtime on Cloud Infra v3.',
      unread: true,
    },
    {
      id: 2,
      title: 'New Enterprise Deal',
      time: '1h ago',
      desc: 'Deal DEAL-804 with Aegean Advisory moved to Won ($29,000).',
      unread: true,
    },
    {
      id: 3,
      title: 'Expense Claim Pending',
      time: '3h ago',
      desc: 'Liam Chen submitted an expense claim of $845.50 for travel.',
      unread: false,
    },
  ]

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const q = searchQuery.toLowerCase()
    if (q.includes('emp') || q.includes('sarah') || q.includes('alex') || q.includes('priya')) {
      router.push('/hrm/employees')
    } else if (q.includes('att') || q.includes('clock') || q.includes('punch')) {
      router.push('/hrm/attendance')
    } else if (q.includes('overtime') || q.includes('ot')) {
      router.push('/hrm/overtime')
    } else if (q.includes('exp') || q.includes('claim')) {
      router.push('/hrm/expenses')
    } else if (q.includes('pay') || q.includes('salary')) {
      router.push('/hrm/payroll')
    } else if (q.includes('lead') || q.includes('deal') || q.includes('crm')) {
      router.push('/crm/leads')
    } else {
      toast.info('Search Query', {
        description: `Filtering records for "${searchQuery}"`,
      })
    }
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-sm sm:px-6">
      {/* Left: Mobile hamburger + Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Trigger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label="Open Navigation"
          >
            <RiMenuLine className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 max-w-[80vw]">
            <Sidebar onNavigate={() => setMobileOpen(false)} className="w-full border-none" />
          </SheetContent>
        </Sheet>

        <div className="hidden sm:block">
          <Breadcrumbs />
        </div>
      </div>

      {/* Middle: Active Portal Pills */}
      <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/80">
        <Link
          href="/admin/hrm/dashboard"
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
            currentModule === 'HRM'
              ? 'bg-white text-teal-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <RiBuilding4Line className="size-3.5 text-teal-600" />
          <span>HRM Module</span>
        </Link>
        <Link
          href="/admin/crm/dashboard"
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
            currentModule === 'CRM'
              ? 'bg-white text-teal-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <RiBriefcaseLine className="size-3.5 text-teal-600" />
          <span>CRM Module</span>
        </Link>
        <Link
          href="/admin/dashboard"
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
            currentModule === 'Suite'
              ? 'bg-white text-teal-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <RiApps2Line className="size-3.5 text-slate-500" />
          <span>Unified Dashboard</span>
        </Link>
      </div>

      {/* Right: Search, Notifications & User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative hidden sm:block w-48 md:w-60"
        >
          <RiSearchLine className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employee, lead, deal..."
            className="h-9 pl-8 pr-3 text-xs bg-slate-50 border-slate-200 focus-visible:bg-white focus-visible:ring-teal-500"
          />
        </form>

        {/* Notifications Popover */}
        <Popover>
          <PopoverTrigger className="relative flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors">
            <RiNotification3Line className="size-4.5" />
            <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white shadow-xs">
              2
            </span>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-80 p-0 bg-white border border-slate-200 shadow-xl rounded-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50/50 rounded-t-xl">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900">
                  Notifications
                </span>
                <Badge className="bg-teal-100 text-teal-800 text-[10px] font-bold h-4 px-1.5 shadow-none">
                  2 New
                </Badge>
              </div>
              <button
                onClick={() => toast.success('All marked as read')}
                className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-1 font-medium"
              >
                <RiCheckDoubleLine className="size-3.5" />
                Mark read
              </button>
            </div>
            <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 text-xs hover:bg-slate-50/80 transition-colors ${
                    n.unread ? 'bg-teal-50/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between font-medium text-slate-900">
                    <span className="flex items-center gap-1.5">
                      {n.unread && (
                        <span className="size-1.5 rounded-full bg-teal-600 shrink-0" />
                      )}
                      {n.title}
                    </span>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                  <p className="mt-1 text-slate-500 leading-relaxed">{n.desc}</p>
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-slate-100 text-center bg-slate-50/40 rounded-b-xl">
              <Link
                href="/hrm/announcements"
                className="text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                View all company updates →
              </Link>
            </div>
          </PopoverContent>
        </Popover>

        {/* Admin Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg p-1 hover:bg-slate-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-teal-500">
            <Avatar className="size-8 border border-slate-200">
              <AvatarImage
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                alt="Alexander Vance"
              />
              <AvatarFallback className="bg-teal-600 text-white font-semibold text-xs">
                AV
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 leading-tight">
                Alexander Vance
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                Super Admin
              </span>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 bg-white border border-slate-200 shadow-xl rounded-xl p-1.5"
          >
            <DropdownMenuLabel className="px-2 py-1.5">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-900">
                  Alexander Vance
                </span>
                <span className="text-[11px] text-slate-500">
                  alexander.vance@qbsuite.com
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100 my-1" />
            <DropdownMenuItem
              onClick={() => router.push('/hrm/employees')}
              className="text-xs p-2 rounded-lg cursor-pointer text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <RiUser3Line className="size-4 text-slate-500" />
              <span>Admin Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push('/hrm/announcements')}
              className="text-xs p-2 rounded-lg cursor-pointer text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <RiSettings4Line className="size-4 text-slate-500" />
              <span>System Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100 my-1" />
            <DropdownMenuItem
              onClick={() => toast.success('Signed out successfully')}
              className="text-xs p-2 rounded-lg cursor-pointer text-rose-600 hover:bg-rose-50 flex items-center gap-2"
            >
              <RiLogoutBoxRLine className="size-4 text-rose-500" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiDashboardLine, RiBriefcaseLine, RiBuilding4Line, RiSettings4Line, RiDashboard2Line, RiUserSearchLine, RiContactsBookLine, RiMegaphoneLine, RiWhatsappLine, RiMetaLine, RiBarChartBoxLine, RiTeamLine, RiCalendarCheckLine, RiCupLine, RiTimeLine, RiMoneyDollarCircleLine, RiCalendarCloseLine, RiBankCardLine, RiFileTextLine, RiNotificationBadgeLine, RiPieChartLine, RiArrowDownSLine, RiArrowRightSLine, RiShieldCheckLine, } from '@remixicon/react';
import { Badge } from '@/components/common/Badge';
import { mockKpiData, mockCrmKpiData } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
export function Sidebar({ className, onNavigate }) {
    const pathname = usePathname();
    // Track independent open/collapsed state for CRM and HRM
    const [crmOpen, setCrmOpen] = React.useState(() => {
        return pathname.includes('/crm') || pathname === '/' || pathname.includes('/dashboard');
    });
    const [hrmOpen, setHrmOpen] = React.useState(() => {
        return pathname.includes('/hrm') || pathname === '/' || pathname.includes('/dashboard');
    });
    // Keep section open if user navigates into it
    React.useEffect(() => {
        if (pathname.includes('/crm')) {
            setCrmOpen(true);
        }
        if (pathname.includes('/hrm')) {
            setHrmOpen(true);
        }
    }, [pathname]);
    const isLinkActive = (href, matchExact) => {
        if (matchExact) {
            return pathname === href;
        }
        return pathname === href || pathname.startsWith(href + '/');
    };
    const crmNavItems = [
        {
            name: 'CRM Dashboard',
            href: '/admin/crm/dashboard',
            icon: RiDashboard2Line,
            matchExact: true,
        },
        {
            name: 'Leads',
            href: '/admin/crm/leads',
            icon: RiUserSearchLine,
            badge: mockCrmKpiData.leadsCount.toString(),
        },
        {
            name: 'Customers',
            href: '/admin/crm/customers',
            icon: RiContactsBookLine,
        },
        {
            name: 'Campaigns',
            href: '/admin/crm/campaigns',
            icon: RiMegaphoneLine,
        },
        {
            name: 'WhatsApp',
            href: '/admin/crm/whatsapp',
            icon: RiWhatsappLine,
            badge: 'Live',
            badgeVariant: 'teal',
        },
        {
            name: 'Meta Integration',
            href: '/admin/crm/meta-integration',
            icon: RiMetaLine,
        },
        {
            name: 'CRM Reports',
            href: '/admin/crm/reports',
            icon: RiBarChartBoxLine,
        },
    ];
    const hrmNavItems = [
        {
            name: 'HRM Dashboard',
            href: '/admin/hrm/dashboard',
            icon: RiDashboard2Line,
            matchExact: true,
        },
        {
            name: 'Employees',
            href: '/admin/hrm/employees',
            icon: RiTeamLine,
            badge: '10',
        },
        {
            name: 'Attendance',
            href: '/admin/hrm/attendance',
            icon: RiCalendarCheckLine,
        },
        {
            name: 'Break Management',
            href: '/admin/hrm/break-management',
            icon: RiCupLine,
        },
        {
            name: 'Overtime Approvals',
            href: '/admin/hrm/overtime',
            icon: RiTimeLine,
            badge: mockKpiData.pendingOvertime.toString(),
            badgeVariant: 'warning',
        },
        {
            name: 'Expense Claims',
            href: '/admin/hrm/expense-claims',
            icon: RiMoneyDollarCircleLine,
            badge: mockKpiData.pendingExpenses.toString(),
            badgeVariant: 'warning',
        },
        {
            name: 'Leave Management',
            href: '/admin/hrm/leaves',
            icon: RiCalendarCloseLine,
        },
        {
            name: 'Payroll',
            href: '/admin/hrm/payroll',
            icon: RiBankCardLine,
        },
        {
            name: 'Salary Slips',
            href: '/admin/hrm/salary-slips',
            icon: RiFileTextLine,
        },
        {
            name: 'Announcements',
            href: '/admin/hrm/announcements',
            icon: RiNotificationBadgeLine,
        },
        {
            name: 'HRM Reports',
            href: '/admin/hrm/reports',
            icon: RiPieChartLine,
        },
    ];
    return (<aside className={cn('flex flex-col h-full bg-white border-r border-slate-200/80 w-64 select-none shrink-0', className)}>
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-200/70">
        <Link href="/admin/dashboard" onClick={onNavigate} className="flex items-center gap-2.5 group transition-transform active:scale-98">
          <div className="flex size-9 items-center justify-center rounded-lg bg-teal-600 text-white font-black text-lg shadow-sm shadow-teal-700/20">
            QB
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                QB Suite
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200 px-1 rounded">
                Unified
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              CRM & HRM Admin OS
            </span>
          </div>
        </Link>
      </div>

      {/* Main Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {/* Main Dashboard Link */}
        <div>
          <Link href="/admin/dashboard" onClick={onNavigate} className={cn('flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all group', pathname === '/admin/dashboard' || pathname === '/'
            ? 'bg-teal-50 text-teal-700 shadow-xs'
            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900')}>
            <div className="flex items-center gap-3">
              <RiDashboardLine className={cn('size-5 transition-colors', pathname === '/admin/dashboard' || pathname === '/'
            ? 'text-teal-600'
            : 'text-slate-400 group-hover:text-slate-600')}/>
              <span>Dashboard</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
              Overview
            </span>
          </Link>
        </div>

        {/* CRM Module Section */}
        <div className="space-y-1">
          <button type="button" onClick={() => setCrmOpen((prev) => !prev)} className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2">
              <RiBriefcaseLine className="size-4 text-teal-600"/>
              <span>CRM Module</span>
            </div>
            {crmOpen ? (<RiArrowDownSLine className="size-4 text-slate-400"/>) : (<RiArrowRightSLine className="size-4 text-slate-400"/>)}
          </button>

          {crmOpen && (<div className="pl-2 space-y-0.5 border-l-2 border-teal-100 ml-3 mt-1">
              {crmNavItems.map((item) => {
                const active = isLinkActive(item.href, item.matchExact);
                const Icon = item.icon;
                return (<Link key={item.href} href={item.href} onClick={onNavigate} className={cn('flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors group', active
                        ? 'bg-teal-50 text-teal-700 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')}>
                    <div className="flex items-center gap-2 truncate">
                      <Icon className={cn('size-4 shrink-0', active
                        ? 'text-teal-600'
                        : 'text-slate-400 group-hover:text-slate-600')}/>
                      <span className="truncate">{item.name}</span>
                    </div>

                    {item.badge && (<Badge variant="outline" className={cn('text-[10px] font-semibold px-1.5 py-0 rounded-full h-4.5 border-none shadow-none', item.badgeVariant === 'teal'
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-slate-100 text-slate-600')}>
                        {item.badge}
                      </Badge>)}
                  </Link>);
            })}
            </div>)}
        </div>

        {/* HRM Module Section */}
        <div className="space-y-1">
          <button type="button" onClick={() => setHrmOpen((prev) => !prev)} className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-2">
              <RiBuilding4Line className="size-4 text-teal-600"/>
              <span>HRM Module</span>
            </div>
            {hrmOpen ? (<RiArrowDownSLine className="size-4 text-slate-400"/>) : (<RiArrowRightSLine className="size-4 text-slate-400"/>)}
          </button>

          {hrmOpen && (<div className="pl-2 space-y-0.5 border-l-2 border-teal-100 ml-3 mt-1">
              {hrmNavItems.map((item) => {
                const active = isLinkActive(item.href, item.matchExact);
                const Icon = item.icon;
                return (<Link key={item.href} href={item.href} onClick={onNavigate} className={cn('flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors group', active
                        ? 'bg-teal-50 text-teal-700 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')}>
                    <div className="flex items-center gap-2 truncate">
                      <Icon className={cn('size-4 shrink-0', active
                        ? 'text-teal-600'
                        : 'text-slate-400 group-hover:text-slate-600')}/>
                      <span className="truncate">{item.name}</span>
                    </div>

                    {item.badge && (<Badge variant="outline" className={cn('text-[10px] font-semibold px-1.5 py-0 rounded-full h-4.5 border-none shadow-none', item.badgeVariant === 'warning'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600')}>
                        {item.badge}
                      </Badge>)}
                  </Link>);
            })}
            </div>)}
        </div>

        {/* Global Settings */}
        <div className="pt-2 border-t border-slate-100">
          <Link href="/admin/settings" onClick={onNavigate} className={cn('flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group', isLinkActive('/admin/settings')
            ? 'bg-teal-50 text-teal-700 font-semibold shadow-xs'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')}>
            <RiSettings4Line className={cn('size-4.5 transition-colors', isLinkActive('/admin/settings')
            ? 'text-teal-600'
            : 'text-slate-400 group-hover:text-slate-600')}/>
            <span>Settings</span>
          </Link>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-200/80 bg-slate-50/50">
        <div className="rounded-lg p-2.5 bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-teal-100 text-teal-700">
              <RiShieldCheckLine className="size-4"/>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-800">
                Enterprise Suite
              </span>
              <span className="text-[10px] text-emerald-600 font-medium">
                Active • CRM + HRM
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>);
}

'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { faChevronDown, faGauge, faGear, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { navigation as crm } from '@/modules/crm/navigation';
import { navigation as hrm } from '@/modules/hrm/navigation';
import { navigation as production } from '@/modules/production/navigation';
import { navigation as customer } from '@/modules/customer/navigation';
import { FontAwesomeIcon } from '@/components/icons/FontAwesomeIcon';
import { useSidebarStore } from '@/hooks/use-sidebar-store';
import { cn } from '@/lib/utils';

const groups = [
    { name: 'CRM', items: crm },
    { name: 'HRM', items: hrm },
    { name: 'Production', items: production },
    { name: 'Customer', items: customer },
];

const overviewItem = { name: 'Dashboard', href: '/admin/dashboard', icon: faGauge, matchExact: true };
const settingsItem = { name: 'Settings', href: '/admin/settings', icon: faGear, matchExact: true };

function isActive(item, pathname) {
    if (item.matchExact) return pathname === item.href;
    return pathname === item.href || pathname.startsWith(item.href + '/');
}

function NavLink({ item, pathname, collapsed, onNavigate }) {
    const active = isActive(item, pathname);
    return (
        <Link
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            title={collapsed ? item.name : undefined}
            className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                collapsed && 'justify-center px-0',
                active
                    ? 'bg-sidebar-primary text-white shadow-sm'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-white'
            )}
        >
            {item.icon && (
                <FontAwesomeIcon
                    icon={item.icon}
                    size={18}
                    className={cn('shrink-0', active ? 'text-white' : 'text-sidebar-muted group-hover:text-white')}
                />
            )}
            {!collapsed && <span className="flex-1 truncate">{item.name}</span>}
            {!collapsed && item.badge && (
                <span
                    className={cn(
                        'ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none',
                        item.badgeVariant === 'warning'
                            ? 'bg-amber-400/20 text-amber-300'
                            : active
                              ? 'bg-white/25 text-white'
                              : 'bg-sidebar-accent text-sidebar-foreground'
                    )}
                >
                    {item.badge}
                </span>
            )}
        </Link>
    );
}

function NavGroup({ group, pathname, collapsed, onNavigate }) {
    const containsActive = group.items.some((item) => isActive(item, pathname));
    // The group containing the active route always stays open; otherwise the
    // user's last toggle wins.
    const [closedByUser, setClosedByUser] = React.useState(false);
    const open = containsActive || !closedByUser;

    if (collapsed) {
        return (
            <div className="space-y-1">
                {group.items.map((item) => (
                    <NavLink key={item.href} item={item} pathname={pathname} collapsed onNavigate={onNavigate} />
                ))}
            </div>
        );
    }

    return (
        <div>
            <button
                type="button"
                onClick={() => setClosedByUser(open)}
                aria-expanded={open}
                className="flex w-full items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-muted hover:text-white transition-colors"
            >
                <span>{group.name}</span>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className={cn('size-3 transition-transform duration-200', open && 'rotate-180')}
                />
            </button>
            <div
                className={cn(
                    'grid transition-all duration-200',
                    open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                )}
            >
                <div className="overflow-hidden">
                    <div className="space-y-0.5 pb-1">
                        {group.items.map((item) => (
                            <NavLink key={item.href} item={item} pathname={pathname} collapsed={false} onNavigate={onNavigate} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Sidebar({ className = '', onNavigate }) {
    const pathname = usePathname();
    const { collapsed } = useSidebarStore();
    // Mobile drawer always shows the expanded sidebar.
    const isCollapsed = collapsed && !onNavigate;

    return (
        <aside
            className={cn(
                'flex h-full shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-300',
                isCollapsed ? 'w-20' : 'w-64',
                className
            )}
        >
            {/* Branding header */}
            <Link
                href="/admin/dashboard"
                onClick={onNavigate}
                className={cn('flex items-center gap-3 border-b border-sidebar-border px-5 py-5', isCollapsed && 'justify-center px-0')}
            >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-white shadow-md">
                    <FontAwesomeIcon icon={faLayerGroup} className="size-5" />
                </div>
                {!isCollapsed && (
                    <div className="min-w-0">
                        <p className="text-base font-bold leading-tight text-white">QB Suite</p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sidebar-muted">
                            Admin Panel
                        </p>
                    </div>
                )}
            </Link>

            {/* Navigation */}
            <ScrollArea className="min-h-0 flex-1"><nav
                aria-label="Main navigation"
                className={cn('flex-1 space-y-1 overflow-y-auto p-3', isCollapsed && 'px-2')}
            >
                <NavLink item={overviewItem} pathname={pathname} collapsed={isCollapsed} onNavigate={onNavigate} />
                <div className="space-y-2 pt-2">
                    {groups.map((group) => (
                        <NavGroup
                            key={group.name}
                            group={group}
                            pathname={pathname}
                            collapsed={isCollapsed}
                            onNavigate={onNavigate}
                        />
                    ))}
                </div>
                <div className="pt-2">
                    <NavLink item={settingsItem} pathname={pathname} collapsed={isCollapsed} onNavigate={onNavigate} />
                </div>
            </nav></ScrollArea>

            {/* Footer branding */}
            <div className={cn('border-t border-sidebar-border p-4', isCollapsed && 'px-2')}>
                {isCollapsed ? (
                    <div className="flex justify-center" title="QB Suite — Employee Workforce Portal">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-accent">
                            <FontAwesomeIcon icon={faLayerGroup} className="size-4 text-sidebar-primary" />
                        </div>
                    </div>
                ) : (
                    <div className="rounded-xl bg-sidebar-accent/60 p-3.5">
                        <p className="text-xs font-bold text-white">QB Suite</p>
                        <p className="mt-0.5 text-[11px] font-medium text-sidebar-foreground/90">
                            Employee Workforce Portal
                        </p>
                        <p className="mt-1.5 text-[10px] italic text-sidebar-muted">
                            Work Smart. Grow Together.
                        </p>
                    </div>
                )}
            </div>
        </aside>
    );
}

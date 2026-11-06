'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    faBriefcase,
    faBullhorn,
    faBullseye,
    faChevronDown,
    faClone,
    faDatabase,
    faFileLines,
    faGauge,
    faGear,
    faLayerGroup,
    faStar,
    faUser,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { navigation as crm } from '@/modules/crm/navigation';
import { navigation as hrm } from '@/modules/hrm/navigation';
import { navigation as production } from '@/modules/production/navigation';
import { navigation as customer } from '@/modules/customer/navigation';
import {
    aiSocialNavigation,
    contentNavigation,
    dataCaptureNavigation,
    influencerNavigation,
    masterNavigation,
    settingsNavigation,
    templatesNavigation,
} from '@/modules/sidebar/extra-navigation';
import { FontAwesomeIcon } from '@/components/icons/FontAwesomeIcon';
import { useSidebarStore } from '@/hooks/use-sidebar-store';
import { cn } from '@/lib/utils';

const overviewItem = { name: 'Dashboard', href: '/admin/dashboard', icon: faGauge, matchExact: true };

const groups = [
    { name: 'Dashboard', icon: faGauge, items: [overviewItem] },
    { name: 'Data Capture', icon: faBullseye, items: dataCaptureNavigation },
    { name: 'HRM', icon: faBriefcase, items: hrm },
    { name: 'Master', icon: faDatabase, items: masterNavigation },
    { name: 'Templates', icon: faClone, items: templatesNavigation },
    { name: 'CRM', icon: faUser, items: crm },
    { name: 'AI & Social', icon: faStar, items: aiSocialNavigation },
    { name: 'Customers', icon: faFileLines, items: customer },
    { name: 'Production', icon: faLayerGroup, items: production },
    { name: 'Influencer Management', icon: faBullhorn, items: influencerNavigation },
    { name: 'Content Management', icon: faVideo, items: contentNavigation },
    { name: 'Settings', icon: faGear, items: settingsNavigation },
];

function isActive(item, pathname) {
    if (item.matchExact) return pathname === item.href;
    return pathname === item.href || pathname.startsWith(item.href + '/');
}

function itemActive(item, pathname) {
    if (item.children) return item.children.some((child) => isActive(child, pathname));
    return isActive(item, pathname);
}

function linkCount(items) {
    return items.reduce((count, item) => count + (item.children ? item.children.length : 1), 0);
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
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
                collapsed && 'justify-center px-0',
                active
                    ? 'bg-[#3DDC84] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
            )}
        >
            {item.icon && (
                <FontAwesomeIcon
                    icon={item.icon}
                    size={16}
                    className={cn('shrink-0', active ? 'text-white' : 'text-slate-400')}
                />
            )}
            {!collapsed && <span className="min-w-0 flex-1 truncate">{item.name}</span>}
            {!collapsed && item.tag && (
                <span className={cn('shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-bold tracking-wide', active ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-400')}>
                    {item.tag}
                </span>
            )}
            {!collapsed && item.badge && !item.tag && (
                <span className={cn('shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold', active ? 'bg-white/25 text-white' : 'bg-amber-100 text-amber-700')}>
                    {item.badge}
                </span>
            )}
        </Link>
    );
}

function NavItems({ items, pathname, collapsed, onNavigate }) {
    return items.map((item) =>
        item.children ? (
            <div key={item.name} className="space-y-0.5">
                {!collapsed && (
                    <p className="px-3 pb-1 pt-2 text-[11px] font-extrabold uppercase tracking-wide text-slate-400">
                        {item.name}
                    </p>
                )}
                {item.children.map((child) => (
                    <NavLink key={child.href} item={child} pathname={pathname} collapsed={collapsed} onNavigate={onNavigate} />
                ))}
            </div>
        ) : (
            <NavLink key={item.href} item={item} pathname={pathname} collapsed={collapsed} onNavigate={onNavigate} />
        )
    );
}
function NavGroup({ group, pathname, collapsed, onNavigate }) {
    const containsActive = group.items.some((item) => itemActive(item, pathname));
    const [open, setOpen] = React.useState(true);

    if (collapsed) {
        return (
            <div className="space-y-1">
                <NavItems items={group.items} pathname={pathname} collapsed onNavigate={onNavigate} />
            </div>
        );
    }

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left"
            >
                <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-lg', containsActive ? 'bg-[#3DDC84] text-white' : 'bg-slate-100 text-slate-500')}>
                    <FontAwesomeIcon icon={group.icon} size={14} />
                </span>
                <span className="min-w-0 flex-1 truncate text-[12px] font-extrabold uppercase tracking-wide text-slate-800">
                    {group.name}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500">
                    {linkCount(group.items)}
                </span>
                <FontAwesomeIcon icon={faChevronDown} className={cn('size-3 text-slate-400 transition-transform', open && 'rotate-180')} />
            </button>
            {open && (
                <div className="mt-1 space-y-0.5 px-1 pb-1">
                    <NavItems items={group.items} pathname={pathname} collapsed={false} onNavigate={onNavigate} />
                </div>
            )}
        </section>
    );
}

export function Sidebar({ className = '', onNavigate }) {
    const pathname = usePathname();
    const { collapsed } = useSidebarStore();
    const isCollapsed = collapsed && !onNavigate;

    return (
        <aside
            className={cn(
                'flex h-full shrink-0 flex-col bg-[#F7F9FC] text-slate-800 transition-[width] duration-300',
                isCollapsed ? 'w-20' : 'w-72',
                className
            )}
        >
            <Link
                href="/admin/dashboard"
                onClick={onNavigate}
                className={cn('flex items-center gap-3 border-b border-slate-200 px-4 py-4', isCollapsed && 'justify-center px-0')}
            >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#3DDC84] text-white">
                    <FontAwesomeIcon icon={faLayerGroup} className="size-5" />
                </div>
                {!isCollapsed && (
                    <div className="min-w-0">
                        <p className="text-base font-bold leading-tight text-slate-900">QB Suite</p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Admin Panel</p>
                    </div>
                )}
            </Link>

            <ScrollArea className="min-h-0 flex-1">
                <nav aria-label="Main navigation" className={cn('space-y-3 p-3', isCollapsed && 'px-2')}>
                    {groups.map((group) => (
                        <NavGroup
                            key={group.name}
                            group={group}
                            pathname={pathname}
                            collapsed={isCollapsed}
                            onNavigate={onNavigate}
                        />
                    ))}
                </nav>
            </ScrollArea>
        </aside>
    );
}

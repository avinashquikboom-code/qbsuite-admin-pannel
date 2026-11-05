'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation as crm } from '@/modules/crm/navigation';
import { navigation as production } from '@/modules/production/navigation';
import { navigation as customer } from '@/modules/customer/navigation';
import { navigation as legacy } from '@/navigation/legacy';
import { RemixIcon } from '@/components/icons/RemixIcon';
import { Badge } from '@/components/common/Badge';
const groups = [{ name: 'CRM', items: crm }, { name: 'Production', items: production }, { name: 'Customer', items: customer }, { name: 'Existing HRM', items: legacy }];
export function Sidebar({ className = '', onNavigate }) {
 const pathname = usePathname();
 const link = (item) => <Link key={item.href} href={item.href} onClick={onNavigate} aria-current={pathname === item.href ? 'page' : undefined} className={'flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted ' + (pathname === item.href ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground')} >{item.icon && <RemixIcon icon={item.icon} size={18} />}<span className="flex-1">{item.name}</span>{item.badge && <Badge variant="secondary">{item.badge}</Badge>}</Link>;
 return <aside className={'flex h-full w-64 shrink-0 flex-col border-r bg-card '+className}><Link href="/admin/dashboard" className="border-b p-5 text-xl font-bold text-primary">QB Suite</Link><nav aria-label="Main navigation" className="flex-1 space-y-3 overflow-y-auto p-3">{link({ name: 'Overview', href: '/admin/dashboard' })}{groups.map(group => <details key={group.name} open><summary className="cursor-pointer px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">{group.name}</summary><div>{group.items.map(link)}</div></details>)}{link({ name: 'Settings', href: '/admin/settings' })}</nav></aside>;
}

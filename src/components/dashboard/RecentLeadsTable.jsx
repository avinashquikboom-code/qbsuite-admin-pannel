'use client';

import * as React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@/components/icons/FontAwesomeIcon';
import { faArrowRight, faArrowUpWideShort, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { DataTable } from '@/components/common/DataTable';
import { SearchBar } from '@/components/common/SearchBar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { mockLeads } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const SORTABLE = ['name', 'status', 'createdAt'];

export function RecentLeadsTable() {
    const [query, setQuery] = React.useState('');
    const [sortKey, setSortKey] = React.useState('createdAt');
    const [sortDir, setSortDir] = React.useState('desc');

    const toggleSort = (key) => {
        if (!SORTABLE.includes(key)) return;
        if (sortKey === key) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    const sortHeader = (key, label) => (
        <button
            type="button"
            onClick={() => toggleSort(key)}
            className={cn(
                'inline-flex items-center gap-1 uppercase tracking-wider',
                SORTABLE.includes(key) && 'hover:text-brand-dark'
            )}
        >
            {label}
            {SORTABLE.includes(key) && sortKey === key && (
                <FontAwesomeIcon
                    icon={sortDir === 'asc' ? faArrowUpWideShort : faArrowDownWideShort}
                    className="size-3 text-brand"
                />
            )}
        </button>
    );

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        let rows = mockLeads;
        if (q) {
            rows = rows.filter(
                (lead) =>
                    lead.name.toLowerCase().includes(q) ||
                    lead.company.toLowerCase().includes(q) ||
                    lead.source.toLowerCase().includes(q) ||
                    lead.status.toLowerCase().includes(q)
            );
        }
        return [...rows].sort((a, b) => {
            const av = a[sortKey] ?? '';
            const bv = b[sortKey] ?? '';
            const cmp = String(av).localeCompare(String(bv));
            return sortDir === 'asc' ? cmp : -cmp;
        });
    }, [query, sortKey, sortDir]);

    const columns = [
        {
            header: '#',
            className: 'w-10 text-slate-400',
            cell: (item) => filtered.indexOf(item) + 1,
        },
        {
            header: sortHeader('name', 'Lead Name'),
            cell: (item) => (
                <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">{item.name}</p>
                    <p className="truncate text-xs text-slate-500">{item.company}</p>
                </div>
            ),
        },
        { header: 'Source', accessorKey: 'source' },
        {
            header: sortHeader('status', 'Status'),
            cell: (item) => <StatusBadge status={item.status} showIcon={false} />,
        },
        { header: 'Assigned To', accessorKey: 'assignedTo' },
        {
            header: sortHeader('createdAt', 'Created On'),
            cell: (item) =>
                new Date(item.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                }),
        },
    ];

    return (
        <Card className="border border-slate-200/90 bg-white shadow-xs">
            <CardHeader className="p-5 pb-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <CardTitle className="text-base font-bold text-slate-900">
                            Recent Leads
                        </CardTitle>
                        <CardDescription className="mt-1 text-xs text-slate-500">
                            Latest leads captured across all channels
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                        <SearchBar
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search leads…"
                            className="w-44 sm:w-56"
                        />
                        <Link
                            href="/admin/crm/leads"
                            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand hover:text-brand-dark"
                        >
                            View All
                            <FontAwesomeIcon icon={faArrowRight} className="size-3" />
                        </Link>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-5 pt-2">
                <DataTable
                    columns={columns}
                    data={filtered}
                    pageSize={5}
                    emptyState="No leads match your search."
                />
            </CardContent>
        </Card>
    );
}

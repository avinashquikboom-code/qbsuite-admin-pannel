'use client';

import * as React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { mockLeadsTrend, mockDashboardKpi } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const subscribe = () => () => {};

const RANGES = [
    { key: '7d', label: '7 Days', days: 7 },
    { key: '14d', label: '14 Days', days: 14 },
];

export function LeadsOverviewChart() {
    const mounted = React.useSyncExternalStore(subscribe, () => true, () => false);
    const [range, setRange] = React.useState('14d');

    const days = RANGES.find((r) => r.key === range)?.days ?? 14;
    const data = mockLeadsTrend.slice(-days);

    return (
        <Card className="border border-slate-200/90 bg-white shadow-xs">
            <CardHeader className="p-5 pb-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <CardTitle className="text-base font-bold text-slate-900">
                            Leads Overview
                        </CardTitle>
                        <CardDescription className="mt-1 text-xs text-slate-500">
                            {mockDashboardKpi.activeLeads} active leads ·{' '}
                            <span className="font-semibold text-brand">
                                {mockDashboardKpi.activeLeadsChange}
                            </span>{' '}
                            vs last month
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
                        {RANGES.map((r) => (
                            <button
                                key={r.key}
                                type="button"
                                onClick={() => setRange(r.key)}
                                className={cn(
                                    'rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors',
                                    range === r.key
                                        ? 'bg-white text-brand-dark shadow-xs'
                                        : 'text-slate-500 hover:text-slate-700'
                                )}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-5 pt-2">
                {mounted ? (
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} margin={{ top: 10, right: 10, left: -24, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={{ stroke: '#e2e8f0' }}
                                    tick={{ fill: '#64748b', fontSize: 11 }}
                                    interval="preserveStartEnd"
                                />
                                <YAxis
                                    allowDecimals={false}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#E8F5E9' }}
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        borderColor: '#e2e8f0',
                                        borderRadius: '0.75rem',
                                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                        fontSize: '12px',
                                    }}
                                />
                                <Bar
                                    dataKey="leads"
                                    name="Leads"
                                    fill="var(--primary)"
                                    radius={[4, 4, 0, 0]}
                                    maxBarSize={28}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-64 w-full animate-pulse rounded-lg bg-slate-50" />
                )}
            </CardContent>
        </Card>
    );
}

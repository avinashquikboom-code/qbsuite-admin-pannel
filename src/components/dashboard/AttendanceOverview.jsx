'use client';

import * as React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { mockAttendanceOverview } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const subscribe = () => () => {};

const SEGMENTS = [
    { key: 'present', label: 'Present', color: '#5EC269' },
    { key: 'onLeave', label: 'On Leave', color: '#38bdf8' },
    { key: 'absent', label: 'Absent', color: '#f43f5e' },
    { key: 'notCheckedIn', label: 'Not Checked In', color: '#f59e0b' },
];

const RANGES = ['Today', 'This Week', 'This Month'];

export function AttendanceOverview() {
    const mounted = React.useSyncExternalStore(subscribe, () => true, () => false);
    const [range, setRange] = React.useState('Today');

    const data = SEGMENTS.map((s) => ({ ...s, value: mockAttendanceOverview[s.key] }));

    const chart = (
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
            <div className="relative h-48 w-48 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                borderColor: '#e2e8f0',
                                borderRadius: '0.75rem',
                                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                fontSize: '12px',
                            }}
                        />
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="label"
                            innerRadius={56}
                            outerRadius={80}
                            paddingAngle={3}
                            strokeWidth={0}
                        >
                            {data.map((entry) => (
                                <Cell key={entry.key} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-slate-900">
                        {mockAttendanceOverview.attendancePercentage}%
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">Attendance</span>
                </div>
            </div>

            <ul className="w-full space-y-2.5">
                {data.map((entry) => (
                    <li key={entry.key} className="flex items-center gap-2.5 text-sm">
                        <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="flex-1 text-slate-600">{entry.label}</span>
                        <span className="font-semibold text-slate-900">{entry.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <Card className="border border-slate-200/90 bg-white shadow-xs">
            <CardHeader className="p-5 pb-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <CardTitle className="text-base font-bold text-slate-900">
                            Attendance Overview
                        </CardTitle>
                        <CardDescription className="mt-1 text-xs text-slate-500">
                            Today&apos;s workforce check-in distribution
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
                        {RANGES.map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setRange(r)}
                                className={cn(
                                    'rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors',
                                    range === r
                                        ? 'bg-white text-brand-dark shadow-xs'
                                        : 'text-slate-500 hover:text-slate-700'
                                )}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-5 pt-2">
                {mounted ? (
                    chart
                ) : (
                    <div className="h-48 w-full animate-pulse rounded-lg bg-slate-50" />
                )}
            </CardContent>
        </Card>
    );
}

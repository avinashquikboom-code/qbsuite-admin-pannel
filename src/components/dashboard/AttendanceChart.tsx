'use client'

import * as React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { mockAttendanceTrend } from '@/lib/mock-data'
import { RiCalendarCheckLine } from '@remixicon/react'

export function AttendanceChart() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="border border-slate-200 bg-white">
        <CardHeader className="p-5 pb-0">
          <div className="h-6 w-48 bg-slate-100 rounded animate-pulse" />
          <div className="h-4 w-72 bg-slate-50 rounded animate-pulse mt-1" />
        </CardHeader>
        <CardContent className="p-5">
          <div className="h-64 w-full bg-slate-50 rounded-lg animate-pulse" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-slate-200/90 bg-white shadow-xs">
      <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <RiCalendarCheckLine className="size-5 text-teal-600" />
            <CardTitle className="text-base font-bold text-slate-900">
              Weekly Attendance Analysis
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-slate-500 mt-1">
            Workforce distribution across present, late arrivals, and approved leaves (Mar 18 - Mar 24)
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mockAttendanceTrend}
              margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '0.75rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px',
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '12px', fontSize: '12px' }}
                iconType="circle"
              />
              <Bar
                dataKey="present"
                name="Present"
                fill="#009688"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
              <Bar
                dataKey="late"
                name="Late"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
              <Bar
                dataKey="onLeave"
                name="On Leave"
                fill="#38bdf8"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
              <Bar
                dataKey="absent"
                name="Absent"
                fill="#f43f5e"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

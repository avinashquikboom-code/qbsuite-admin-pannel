'use client';
import * as React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { mockKpiData } from '@/lib/mock-data';
import { RiTeamLine, RiCalendarCheckLine, RiTimeLine, RiMoneyDollarCircleLine, RiCalendarCloseLine, RiBankCardLine, RiAlertLine, RiUserAddLine, } from '@remixicon/react';
export default function HrmDashboardPage() {
    return (<div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader title="HRM Operations Dashboard" description="Comprehensive people operations, real-time attendance tracking, pending approvals, and payroll processing." badge={<Badge className="bg-brand-light text-brand-dark border-brand-light text-xs font-semibold px-2 py-0.5">
            Human Resources Portal
          </Badge>} actions={<div className="flex items-center gap-2">
            <Link href="/admin/hrm/attendance">
              <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:text-brand-dark text-xs h-9">
                <RiCalendarCheckLine className="size-4 mr-1.5 text-brand"/>
                Live Attendance
              </Button>
            </Link>
            <Link href="/admin/hrm/employees">
              <Button size="sm" className="bg-brand hover:bg-brand-dark text-white text-xs h-9 font-medium">
                <RiUserAddLine className="size-4 mr-1.5"/>
                Add Employee
              </Button>
            </Link>
          </div>}/>

      {/* 8 Primary HRM KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Workforce" value={mockKpiData.totalEmployees} change={mockKpiData.totalEmployeesChange} changeType="positive" icon={RiTeamLine} iconColor="text-brand" iconBg="bg-brand-light"/>
        <StatCard title="Present Today" value={mockKpiData.presentToday} change={`${mockKpiData.presentPercentage}% attendance rate`} changeType="positive" icon={RiCalendarCheckLine} iconColor="text-brand" iconBg="bg-brand-light"/>
        <StatCard title="Late Arrivals" value={mockKpiData.lateToday} change="Flagged for manager review" changeType="neutral" icon={RiAlertLine} iconColor="text-amber-600" iconBg="bg-amber-50"/>
        <StatCard title="On Approved Leave" value={mockKpiData.onLeaveToday} change="Scheduled vacation & medical" changeType="neutral" icon={RiCalendarCloseLine} iconColor="text-brand-dark" iconBg="bg-brand-light"/>
        <StatCard title="Pending Overtime" value={mockKpiData.pendingOvertime} change="3 requests awaiting signoff" changeType="neutral" icon={RiTimeLine} iconColor="text-amber-600" iconBg="bg-amber-50" badge="Action Required"/>
        <StatCard title="Expense Claims" value={`$${mockKpiData.pendingExpensesAmount}`} change={`${mockKpiData.pendingExpenses} pending review`} changeType="neutral" icon={RiMoneyDollarCircleLine} iconColor="text-brand" iconBg="bg-brand-light"/>
        <StatCard title="Unexcused Absentees" value={mockKpiData.absentToday} change="Requires HR outreach" changeType="negative" icon={RiAlertLine} iconColor="text-rose-600" iconBg="bg-rose-50"/>
        <StatCard title="Monthly Payroll" value={`$${(mockKpiData.monthlyPayroll / 1000).toFixed(1)}k`} change={mockKpiData.monthlyPayrollChange} changeType="positive" icon={RiBankCardLine} iconColor="text-brand-dark" iconBg="bg-brand-light"/>
      </div>

      {/* Main HRM Analytics & Operations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart />
        <RecentActivity />
      </div>
    </div>);
}

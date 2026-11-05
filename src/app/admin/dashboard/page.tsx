'use client'

import * as React from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiCard } from '@/components/dashboard/KpiCard'
import { AttendanceChart } from '@/components/dashboard/AttendanceChart'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  mockKpiData,
  mockCrmKpiData,
  mockPipelineStages,
  mockEmployees,
  mockDeals,
} from '@/lib/mock-data'
import {
  RiBuilding4Line,
  RiBriefcaseLine,
  RiTeamLine,
  RiCalendarCheckLine,
  RiMoneyDollarCircleLine,
  RiExchangeDollarLine,
  RiTimeLine,
  RiArrowRightLine,
  RiUserFollowLine,
  RiCheckDoubleLine,
} from '@remixicon/react'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="QB Suite Executive Portal"
        description="Unified Enterprise Operations across Human Resources, Workforce Management, and Sales CRM."
        badge={
          <Badge className="bg-teal-50 text-teal-700 border-teal-200 text-xs font-semibold px-2 py-0.5">
            Q1 2026 Live
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Link href="/admin/hrm/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-200 text-slate-700 hover:text-teal-700 text-xs h-9"
              >
                <RiBuilding4Line className="size-4 mr-1.5 text-teal-600" />
                HRM Module
              </Button>
            </Link>
            <Link href="/admin/crm/dashboard">
              <Button
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs h-9 font-medium"
              >
                <RiBriefcaseLine className="size-4 mr-1.5" />
                CRM Module
              </Button>
            </Link>
          </div>
        }
      />

      {/* Executive Combined KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Workforce"
          value={mockKpiData.totalEmployees}
          change={mockKpiData.totalEmployeesChange}
          changeType="positive"
          icon={RiTeamLine}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
          description="Active team headcount"
        />
        <KpiCard
          title="Attendance Today"
          value={`${mockKpiData.presentPercentage}%`}
          change={`${mockKpiData.presentToday} Present / ${mockKpiData.absentToday} Absent`}
          changeType="positive"
          icon={RiCalendarCheckLine}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <KpiCard
          title="CRM Pipeline Value"
          value={`$${(mockCrmKpiData.pipelineValue / 1000).toFixed(0)}k`}
          change={`${mockCrmKpiData.activeDealsCount} Active Deals in Flight`}
          changeType="positive"
          icon={RiExchangeDollarLine}
          iconColor="text-teal-700"
          iconBg="bg-teal-50"
          badge="High Velocity"
        />
        <KpiCard
          title="Total Q1 Revenue"
          value={`$${mockCrmKpiData.totalRevenue.toLocaleString()}`}
          change={mockCrmKpiData.revenueGrowth}
          changeType="positive"
          icon={RiMoneyDollarCircleLine}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
      </div>

      {/* Module Quick Launch Showcases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* HRM Module Card */}
        <Card className="border border-slate-200 bg-white hover:border-teal-200 transition-all shadow-xs">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <RiBuilding4Line className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">
                    Human Resource Management (HRM)
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Workforce directory, time punching, breaks & payroll
                  </CardDescription>
                </div>
              </div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-2 space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center py-2 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Headcount</p>
                <p className="text-base font-bold text-slate-800">
                  {mockEmployees.length}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Pending OT</p>
                <p className="text-base font-bold text-amber-600">
                  {mockKpiData.pendingOvertime}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Claims</p>
                <p className="text-base font-bold text-teal-700">
                  {mockKpiData.pendingExpenses}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <RiCheckDoubleLine className="size-4 text-emerald-600" />
                <span>Next payroll run: Mar 31, 2026</span>
              </div>
              <Link href="/admin/hrm/dashboard">
                <Button
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold h-8"
                >
                  Enter HRM
                  <RiArrowRightLine className="size-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* CRM Module Card */}
        <Card className="border border-slate-200 bg-white hover:border-teal-200 transition-all shadow-xs">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <RiBriefcaseLine className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">
                    Customer Relationship Management (CRM)
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Sales pipeline, leads, WhatsApp & campaign integration
                  </CardDescription>
                </div>
              </div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-2 space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center py-2 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <p className="text-[11px] text-slate-500 font-medium">New Leads</p>
                <p className="text-base font-bold text-slate-800">
                  {mockCrmKpiData.leadsCount}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Active Deals</p>
                <p className="text-base font-bold text-teal-700">
                  {mockCrmKpiData.activeDealsCount}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Win Rate</p>
                <p className="text-base font-bold text-emerald-600">
                  {mockCrmKpiData.winRate}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <RiUserFollowLine className="size-4 text-teal-600" />
                <span>3 Deals awaiting contract closing</span>
              </div>
              <Link href="/admin/crm/dashboard">
                <Button
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold h-8"
                >
                  Enter CRM
                  <RiArrowRightLine className="size-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts & Live Operations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart />

        {/* CRM Pipeline Funnel Summary */}
        <Card className="border border-slate-200/90 bg-white shadow-xs">
          <CardHeader className="p-5 pb-3">
            <CardTitle className="text-base font-bold text-slate-900">
              CRM Pipeline by Stage
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 mt-1">
              Active enterprise contract value distribution across sales cycle
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-3.5">
            {mockPipelineStages.map((stage) => {
              const maxVal = 120000
              const percentage = Math.round((stage.value / maxVal) * 100)

              return (
                <div key={stage.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">
                      {stage.stage} ({stage.count})
                    </span>
                    <span className="font-bold text-slate-900">
                      ${stage.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(percentage, 5)}%` }}
                    />
                  </div>
                </div>
              )
            })}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Total Pipeline: <strong className="text-slate-800">$360,000</strong>
              </span>
              <Link
                href="/admin/crm/leads"
                className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                View Leads & Pipeline →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operations Activity Widget */}
      <RecentActivity />
    </div>
  )
}

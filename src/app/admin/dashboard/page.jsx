'use client';
import { FontAwesomeIcon } from '@/components/icons/FontAwesomeIcon';
import * as React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { mockKpiData, mockCrmKpiData, mockPipelineStages, mockEmployees, } from '@/lib/mock-data';
import { faArrowRight, faBuilding, faCheckDouble, faDollarSign, faMoneyBillTransfer, faUserCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
export default function AdminDashboardPage() {
    return (<div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader title="QB Suite Executive Portal" description="Unified Enterprise Operations across Human Resources, Workforce Management, and Sales CRM." badge={<Badge className="bg-brand-light text-brand-dark border-brand-light text-xs font-semibold px-2 py-0.5">
            Q1 2026 Live
          </Badge>} actions={<div className="flex items-center gap-2">
            <Link href="/admin/hrm/dashboard">
              <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:text-brand-dark text-xs h-9">
                <FontAwesomeIcon icon={faBuilding} className="size-4 mr-1.5 text-brand"/>
                HRM Module
              </Button>
            </Link>
            <Link href="/admin/crm/dashboard">
              <Button size="sm" className="bg-brand hover:bg-brand-dark text-primary-foreground text-xs h-9 font-medium">
                <FontAwesomeIcon icon={faUsers} className="size-4 mr-1.5"/>
                CRM Module
              </Button>
            </Link>
          </div>}/>

      {/* Executive Combined KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Workforce" value={mockKpiData.totalEmployees} change={mockKpiData.totalEmployeesChange} changeType="positive" icon={faUsers} iconColor="text-brand" iconBg="bg-brand-light" description="Active team headcount"/>
        <StatCard title="Attendance Today" value={`${mockKpiData.presentPercentage}%`} change={`${mockKpiData.presentToday} Present / ${mockKpiData.absentToday} Absent`} changeType="positive" icon={faCalendarCheck} iconColor="text-brand" iconBg="bg-brand-light"/>
        <StatCard title="CRM Pipeline Value" value={`$${(mockCrmKpiData.pipelineValue / 1000).toFixed(0)}k`} change={`${mockCrmKpiData.activeDealsCount} Active Deals in Flight`} changeType="positive" icon={faMoneyBillTransfer} iconColor="text-brand-dark" iconBg="bg-brand-light" badge="High Velocity"/>
        <StatCard title="Total Q1 Revenue" value={`$${mockCrmKpiData.totalRevenue.toLocaleString()}`} change={mockCrmKpiData.revenueGrowth} changeType="positive" icon={faDollarSign} iconColor="text-brand" iconBg="bg-brand-light"/>
      </div>

      {/* Module Quick Launch Showcases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* HRM Module Card */}
        <Card className="border border-slate-200 bg-white hover:border-brand-light transition-all shadow-xs">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-brand-light text-brand">
                  <FontAwesomeIcon icon={faBuilding} className="size-5"/>
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
              <Badge className="bg-brand-light text-brand-dark border-brand-light text-xs">
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
                <p className="text-base font-bold text-brand-dark">
                  {mockKpiData.pendingExpenses}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FontAwesomeIcon icon={faCheckDouble} className="size-4 text-brand"/>
                <span>Next payroll run: Mar 31, 2026</span>
              </div>
              <Link href="/admin/hrm/dashboard">
                <Button size="sm" className="bg-brand hover:bg-brand-dark text-primary-foreground text-xs font-semibold h-8">
                  Enter HRM
                  <FontAwesomeIcon icon={faArrowRight} className="size-3.5 ml-1"/>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* CRM Module Card */}
        <Card className="border border-slate-200 bg-white hover:border-brand-light transition-all shadow-xs">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-brand-light text-brand">
                  <FontAwesomeIcon icon={faUsers} className="size-5"/>
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
              <Badge className="bg-brand-light text-brand-dark border-brand-light text-xs">
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
                <p className="text-base font-bold text-brand-dark">
                  {mockCrmKpiData.activeDealsCount}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Win Rate</p>
                <p className="text-base font-bold text-brand">
                  {mockCrmKpiData.winRate}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FontAwesomeIcon icon={faUserCheck} className="size-4 text-brand"/>
                <span>3 Deals awaiting contract closing</span>
              </div>
              <Link href="/admin/crm/dashboard">
                <Button size="sm" className="bg-brand hover:bg-brand-dark text-primary-foreground text-xs font-semibold h-8">
                  Enter CRM
                  <FontAwesomeIcon icon={faArrowRight} className="size-3.5 ml-1"/>
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
            const maxVal = 120000;
            const percentage = Math.round((stage.value / maxVal) * 100);
            return (<div key={stage.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">
                      {stage.stage} ({stage.count})
                    </span>
                    <span className="font-bold text-slate-900">
                      ${stage.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand rounded-full transition-all duration-500" style={{ width: `${Math.max(percentage, 5)}%` }}/>
                  </div>
                </div>);
        })}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Total Pipeline: <strong className="text-slate-800">$360,000</strong>
              </span>
              <Link href="/admin/crm/leads" className="text-xs font-semibold text-brand hover:text-brand-dark flex items-center gap-1">
                View Leads & Pipeline →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operations Activity Widget */}
      <RecentActivity />
    </div>);
}

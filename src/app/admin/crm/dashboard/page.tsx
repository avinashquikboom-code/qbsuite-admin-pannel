'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  RiUserSearchLine,
  RiMoneyDollarCircleLine,
  RiPercentLine,
  RiContactsBookLine,
  RiArrowRightLine,
  RiAddLine,
  RiWhatsappLine,
  RiMegaphoneLine,
} from '@remixicon/react'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiCard } from '@/components/dashboard/KpiCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { mockCrmKpiData, mockLeads, mockDeals, mockContacts } from '@/lib/mock-data'

export default function CrmDashboardPage() {
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="CRM Executive Dashboard"
        description="Pipeline health, active leads conversion, high-value opportunities and customer acquisition."
        badge="CRM Suite"
        badgeVariant="teal"
        actions={
          <div className="flex items-center gap-2">
            <Link href="/admin/crm/leads">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white gap-1.5 shadow-sm">
                <RiAddLine className="size-4" />
                <span>New Lead</span>
              </Button>
            </Link>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Pipeline Value"
          value={currency.format(mockCrmKpiData.pipelineValue)}
          change="+18.4% vs last month"
          trend="up"
          icon={RiMoneyDollarCircleLine}
          accent="teal"
        />
        <KpiCard
          title="Active Leads"
          value={mockCrmKpiData.leadsCount.toString()}
          change="+12 qualified this week"
          trend="up"
          icon={RiUserSearchLine}
          accent="teal"
        />
        <KpiCard
          title="Deals in Progress"
          value={mockCrmKpiData.activeDealsCount.toString()}
          change="8 closing this sprint"
          trend="neutral"
          icon={RiPercentLine}
          accent="emerald"
        />
        <KpiCard
          title="Key Accounts"
          value={mockContacts.length.toString()}
          change="+3 enterprises added"
          trend="up"
          icon={RiContactsBookLine}
          accent="sky"
        />
      </div>

      {/* Quick Launchpad & Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent High-Value Leads */}
        <Card className="lg:col-span-2 border-slate-200/80 shadow-2xs">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-semibold text-slate-900">
                Recent Inbound Opportunities
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Latest sales leads awaiting qualification and proposal dispatch
              </CardDescription>
            </div>
            <Link href="/admin/crm/leads">
              <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 gap-1 text-xs">
                <span>View All Leads</span>
                <RiArrowRightLine className="size-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {mockLeads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">{lead.name}</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-medium text-slate-600">{lead.company}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>Source: {lead.source}</span>
                      <span>Assigned: {lead.assignedTo}</span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm font-bold text-slate-900">
                      {currency.format(lead.value)}
                    </div>
                    <StatusBadge status={lead.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Channels & Integrations Summary */}
        <div className="space-y-6">
          <Card className="border-slate-200/80 shadow-2xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">
                Sales Engagement Channels
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Connected automation and messaging pipelines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/crm/whatsapp" className="flex items-center justify-between p-3 rounded-lg border border-slate-200/80 hover:border-teal-300 hover:bg-teal-50/40 transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <RiWhatsappLine className="size-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">WhatsApp Business API</div>
                    <div className="text-xs text-emerald-600 font-medium">Synced • 98.4% Delivery</div>
                  </div>
                </div>
                <RiArrowRightLine className="size-4 text-slate-400" />
              </Link>

              <Link href="/admin/crm/campaigns" className="flex items-center justify-between p-3 rounded-lg border border-slate-200/80 hover:border-teal-300 hover:bg-teal-50/40 transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                    <RiMegaphoneLine className="size-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Email & Ad Campaigns</div>
                    <div className="text-xs text-slate-500">3 active campaigns running</div>
                  </div>
                </div>
                <RiArrowRightLine className="size-4 text-slate-400" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border-teal-100 bg-linear-to-br from-teal-50/60 to-white shadow-2xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-teal-900">
                Cross-Module Data Bridge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs text-slate-600 leading-relaxed">
                QB Suite automatically syncs closed-won sales commissions to HRM Payroll modules for automated incentive disbursements.
              </p>
              <div className="pt-2">
                <Link href="/admin/hrm/payroll">
                  <Button variant="outline" size="sm" className="w-full border-teal-300 text-teal-800 hover:bg-teal-100 text-xs font-semibold">
                    Review Sales Payroll Incentives
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

'use client';
import * as React from 'react';
import { RiDownloadLine, RiArrowUpLine, RiTrophyLine, } from '@remixicon/react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { mockPipelineStages } from '@/modules/crm/services/mock-data';
import { toast } from 'sonner';
export default function CrmReportsPage() {
    const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });
    return (<div className="space-y-6">
      <PageHeader title="CRM Revenue & Pipeline Intelligence" description="Comprehensive analysis of customer lifetime value, conversion velocity and sales reps performance." badge="Analytics" badgeVariant="teal" actions={<Button size="sm" onClick={() => toast.success('Analytics report PDF generated!')} className="bg-teal-600 hover:bg-teal-700 text-white gap-1.5 shadow-sm text-xs">
            <RiDownloadLine className="size-4"/>
            <span>Export Analytics</span>
          </Button>}/>

      {/* Topline summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200/80 shadow-2xs">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-medium text-slate-500">Won Revenue YTD</CardTitle>
            <div className="text-2xl font-bold text-teal-700 mt-1">$482,000</div>
            <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <RiArrowUpLine className="size-3"/>
              <span>+24.5% vs prior year</span>
            </div>
          </CardHeader>
        </Card>
        <Card className="border-slate-200/80 shadow-2xs">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-medium text-slate-500">Avg Sales Cycle</CardTitle>
            <div className="text-2xl font-bold text-slate-900 mt-1">26 Days</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">4.2 days faster than industry</div>
          </CardHeader>
        </Card>
        <Card className="border-slate-200/80 shadow-2xs">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-medium text-slate-500">Lead-to-Deal Conversion</CardTitle>
            <div className="text-2xl font-bold text-emerald-600 mt-1">32.8%</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">Top quartile efficiency</div>
          </CardHeader>
        </Card>
        <Card className="border-slate-200/80 shadow-2xs">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-medium text-slate-500">Customer Churn Rate</CardTitle>
            <div className="text-2xl font-bold text-slate-900 mt-1">1.8%</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">98.2% retention</div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Stage Breakdown */}
        <Card className="border-slate-200/80 shadow-2xs">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-900">
              Pipeline Stage Breakdown
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Deal volume and dollar value distribution across sales phases
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockPipelineStages.map((st) => (<div key={st.stage} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{st.stage} ({st.count} deals)</span>
                  <span className="font-bold text-teal-700">{currency.format(st.value)}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-teal-600 h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (st.value / 400000) * 100)}%` }}/>
                </div>
              </div>))}
          </CardContent>
        </Card>

        {/* Representative Leaderboard */}
        <Card className="border-slate-200/80 shadow-2xs">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <RiTrophyLine className="size-5 text-amber-500"/>
              <span>Sales Representative Leaderboard</span>
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Top closing quota performers for current quarter
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100 text-xs">
              {[
            { name: 'Sarah Jenkins', deals: 14, quota: '138%', revenue: 168000, rank: 1 },
            { name: 'Alexander Vance', deals: 11, quota: '112%', revenue: 142000, rank: 2 },
            { name: 'Marcus Brody', deals: 9, quota: '96%', revenue: 98000, rank: 3 },
            { name: 'Emily Thorne', deals: 7, quota: '84%', revenue: 74000, rank: 4 },
        ].map((rep) => (<div key={rep.name} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <span className="flex size-6 items-center justify-center rounded-full bg-slate-100 font-bold text-[11px] text-slate-700">
                      #{rep.rank}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">{rep.name}</div>
                      <div className="text-[11px] text-slate-400">{rep.deals} deals closed</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-teal-700">{currency.format(rep.revenue)}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">{rep.quota} of quota</div>
                  </div>
                </div>))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);
}

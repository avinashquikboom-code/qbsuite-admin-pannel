'use client';
import * as React from 'react';
import { RiMetaLine, RiRefreshLine, RiShieldCheckLine, } from '@remixicon/react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { toast } from 'sonner';
export default function MetaIntegrationPage() {
    const [syncing, setSyncing] = React.useState(false);
    const handleSync = () => {
        setSyncing(true);
        setTimeout(() => {
            setSyncing(false);
            toast.success('Meta Lead Ads synced! 6 new leads ingested.');
        }, 1200);
    };
    return (<div className="space-y-6">
      <PageHeader title="Meta Ads & Business Suite Integration" description="Connect Instagram and Facebook Lead Ads directly into the QB Suite CRM pipeline." badge="Meta Cloud" badgeVariant="teal" actions={<Button size="sm" onClick={handleSync} disabled={syncing} className="bg-teal-600 hover:bg-teal-700 text-white gap-1.5 shadow-sm text-xs">
            <RiRefreshLine className={`size-4 ${syncing ? 'animate-spin' : ''}`}/>
            <span>{syncing ? 'Syncing...' : 'Sync Leads Now'}</span>
          </Button>}/>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-200/80 shadow-2xs">
          <CardHeader>
            <div className="flex size-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600 mb-2">
              <RiMetaLine className="size-6"/>
            </div>
            <CardTitle className="text-base font-bold text-slate-900">
              Facebook Lead Ads
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Instant Instant Form lead ingestion webhook
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-slate-600">Status</span>
              <Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px]">Connected</Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-slate-600">Synced Today</span>
              <span className="font-bold text-slate-900">18 Leads</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-2xs">
          <CardHeader>
            <div className="flex size-10 items-center justify-center rounded-lg bg-pink-50 text-pink-600 mb-2">
              <RiMetaLine className="size-6"/>
            </div>
            <CardTitle className="text-base font-bold text-slate-900">
              Instagram Direct Ads
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Direct message lead capture automation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-slate-600">Status</span>
              <Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px]">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-slate-600">Inbound Inquiries</span>
              <span className="font-bold text-slate-900">12 Chats</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-2xs">
          <CardHeader>
            <div className="flex size-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600 mb-2">
              <RiShieldCheckLine className="size-6"/>
            </div>
            <CardTitle className="text-base font-bold text-slate-900">
              Conversions API (CAPI)
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Server-side offline conversion feedback
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-slate-600">Event Match Quality</span>
              <span className="font-bold text-emerald-600">8.9 / 10 (Great)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-slate-600">Pixel ID</span>
              <span className="font-mono text-slate-500 text-[11px]">893201490219</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);
}

'use client';
import { CustomerGrowthChart } from '@/modules/customer/components/CustomerGrowthChart';
import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/common/Modal';
export default function DashboardPage() {
 const [open, setOpen] = useState(false);
 return <div className="space-y-6"><PageHeader title="Customer" description="Customer workspace" actions={<Button onClick={() => setOpen(true)}>Workspace information</Button>} /><Badge variant="secondary">Not connected</Badge><div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-2"><CustomerGrowthChart /></div><DataTable columns={[{ header: 'Name', accessorKey: 'name' }, { header: 'Status', accessorKey: 'status' }]} data={[]} emptyState="No customer records available. A data source has not been connected." /><Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogTitle>Customer workspace</DialogTitle><DialogDescription>This module uses the shared QB Suite design system. Business workflows and API connections have not been configured.</DialogDescription></DialogContent></Dialog></div>;
}

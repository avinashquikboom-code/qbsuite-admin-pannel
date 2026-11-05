'use client';
import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Badge } from '@/components/common/Badge';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/common/Modal';
export default function DashboardPage() {
 const [query, setQuery] = useState(''); const [open, setOpen] = useState(false);
 return <div className="space-y-6"><PageHeader title="Production" description="Production workspace" actions={<Button onClick={() => setOpen(true)}>Workspace information</Button>} /><Badge variant="secondary">Not connected</Badge><Input aria-label="Search production records" placeholder="Search records…" value={query} onChange={e=>setQuery(e.target.value)} /><DataTable columns={[{ header: 'Name', accessorKey: 'name' }, { header: 'Status', accessorKey: 'status' }]} data={[]} emptyState="No production records available. A data source has not been connected." /><Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogTitle>Production workspace</DialogTitle><DialogDescription>This module uses the shared QB Suite design system. Business workflows and API connections have not been configured.</DialogDescription></DialogContent></Dialog></div>;
}

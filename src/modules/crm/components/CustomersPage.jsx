'use client';import { DataTable } from '@/components/common/DataTable';
import * as React from 'react';
import { RiAddLine, RiSearchLine, RiMailLine, RiPhoneLine, RiBuildingLine, } from '@remixicon/react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/common/Modal';
import { Label } from '@/components/common/Label';
import { mockContacts } from '@/lib/mock-data';
import { toast } from 'sonner';
export default function CustomersPage() {
    const [contacts, setContacts] = React.useState(mockContacts);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedContact, setSelectedContact] = React.useState(null);
    const [isAddOpen, setIsAddOpen] = React.useState(false);
    // New customer form state
    const [newName, setNewName] = React.useState('');
    const [newCompany, setNewCompany] = React.useState('');
    const [newRole, setNewRole] = React.useState('');
    const [newEmail, setNewEmail] = React.useState('');
    const [newPhone, setNewPhone] = React.useState('');
    const [newLocation, setNewLocation] = React.useState('');
    const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });
    const filtered = contacts.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const totalRev = filtered.reduce((acc, c) => acc + c.totalRevenue, 0);
    const handleAddCustomer = (e) => {
        e.preventDefault();
        if (!newName || !newCompany || !newEmail) {
            toast.error('Please fill name, company and email.');
            return;
        }
        const newObj = {
            id: `CUST-${1000 + contacts.length + 1}`,
            name: newName,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            company: newCompany,
            email: newEmail,
            phone: newPhone || '+1 (555) 123-4567',
            role: newRole || 'Head of Procurement',
            dealsCount: 1,
            totalRevenue: 25000,
            status: 'active',
            location: newLocation || 'San Francisco, CA',
            lastContacted: new Date().toISOString().split('T')[0],
        };
        setContacts([newObj, ...contacts]);
        setIsAddOpen(false);
        toast.success(`Customer ${newName} added successfully!`);
        setNewName('');
        setNewCompany('');
        setNewRole('');
        setNewEmail('');
        setNewPhone('');
        setNewLocation('');
    };
    return (<div className="space-y-6">
      <PageHeader title="Enterprise Customers & Accounts" description="Maintain client relationships, contract histories, and account portfolio values." badge="CRM" badgeVariant="teal" actions={<Button size="sm" onClick={() => setIsAddOpen(true)} className="bg-teal-600 hover:bg-teal-700 text-white gap-1.5 shadow-sm text-xs">
            <RiAddLine className="size-4"/>
            <span>Add Customer</span>
          </Button>}/>

      {/* KPI summaries */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200/80 shadow-2xs">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-medium text-slate-500">Active Accounts</CardTitle>
            <div className="text-2xl font-bold text-slate-900 mt-1">{filtered.length}</div>
          </CardHeader>
        </Card>
        <Card className="border-slate-200/80 shadow-2xs">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-medium text-slate-500">Lifetime Portfolio Revenue</CardTitle>
            <div className="text-2xl font-bold text-teal-700 mt-1">{currency.format(totalRev)}</div>
          </CardHeader>
        </Card>
        <Card className="border-slate-200/80 shadow-2xs">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-medium text-slate-500">Avg Deal Size</CardTitle>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              {currency.format(totalRev / (filtered.length || 1))}
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-slate-200/80 shadow-2xs">
        <CardContent className="p-4">
          <div className="relative w-full sm:w-80">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400"/>
            <Input placeholder="Filter by customer name, company, email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9 text-xs border-slate-200 bg-slate-50/50"/>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <DataTable data={filtered} columns={[
{ header: 'Contact', cell: (c) => <>
                    <div>{c.name}</div>
                    <div className="text-[11px] text-slate-400">{c.email}</div>
                  </> },
{ header: 'Organization', cell: (c) => <>
                    <div className="font-semibold text-slate-800">{c.company}</div>
                    <div className="text-[11px] text-slate-500">{c.role}</div>
                  </> },
{ header: 'Location', cell: (c) => <>{c.location}</> },
{ header: 'Closed Deals', cell: (c) => <>{c.dealsCount}</> },
{ header: 'Revenue', cell: (c) => <>{currency.format(c.totalRevenue)}</> },
{ header: 'Status', cell: (c) => <>
                    <StatusBadge status={c.status}/>
                  </> },
{ header: 'Actions', cell: (c) => <>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedContact(c)} className="h-8 text-teal-600 hover:text-teal-700 hover:bg-teal-50 text-xs font-semibold">
                      Dossier
                    </Button>
                  </>, className: 'text-right' }
]} />
        </div>
      </Card>

      {/* Customer Modal */}
      {selectedContact && (<Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-slate-900">Customer Profile</DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Enterprise relationship metrics for {selectedContact.company}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg space-y-2 border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{selectedContact.name}</span>
                  <StatusBadge status={selectedContact.status}/>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <RiBuildingLine className="size-3.5 text-slate-400"/>
                  <span>{selectedContact.company} ({selectedContact.role})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <RiMailLine className="size-3.5 text-slate-400"/>
                  <span>{selectedContact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <RiPhoneLine className="size-3.5 text-slate-400"/>
                  <span>{selectedContact.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Revenue</span>
                  <div className="text-base font-bold text-teal-700">{currency.format(selectedContact.totalRevenue)}</div>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Last Contacted</span>
                  <div className="text-sm font-semibold text-slate-800">{selectedContact.lastContacted}</div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => setSelectedContact(null)} className="text-xs">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>)}

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleAddCustomer}>
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-slate-900">Add Enterprise Customer</DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Register a new corporate buyer or long-term account.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Full Name *</Label>
                  <Input required placeholder="e.g. Maria Santos" value={newName} onChange={(e) => setNewName(e.target.value)} className="h-8 text-xs"/>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Company *</Label>
                  <Input required placeholder="e.g. Globex Corp" value={newCompany} onChange={(e) => setNewCompany(e.target.value)} className="h-8 text-xs"/>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Job Title / Role</Label>
                  <Input placeholder="VP Operations" value={newRole} onChange={(e) => setNewRole(e.target.value)} className="h-8 text-xs"/>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Email *</Label>
                  <Input type="email" required placeholder="maria@globex.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="h-8 text-xs"/>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Phone</Label>
                  <Input placeholder="+1 (555) 000-0000" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className="h-8 text-xs"/>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">HQ Location</Label>
                  <Input placeholder="Chicago, IL" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} className="h-8 text-xs"/>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddOpen(false)} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-teal-600 hover:bg-teal-700 text-white text-xs">
                Save Account
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>);
}

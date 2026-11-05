'use client'

import * as React from 'react'
import {
  RiUserSearchLine,
  RiAddLine,
  RiSearchLine,
  RiDownloadLine,
  RiCheckboxCircleLine,
  RiMailLine,
  RiPhoneLine,
  RiBuildingLine,
} from '@remixicon/react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockLeads } from '@/lib/mock-data'
import { Lead, LeadStatus, LeadSource } from '@/lib/types'
import { toast } from 'sonner'

export default function LeadsPage() {
  const [leads, setLeads] = React.useState<Lead[]>(mockLeads)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<string>('all')
  const [sourceFilter, setSourceFilter] = React.useState<string>('all')
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null)
  const [isAddOpen, setIsAddOpen] = React.useState(false)

  // New lead form state
  const [newName, setNewName] = React.useState('')
  const [newCompany, setNewCompany] = React.useState('')
  const [newEmail, setNewEmail] = React.useState('')
  const [newPhone, setNewPhone] = React.useState('')
  const [newValue, setNewValue] = React.useState('')
  const [newSource, setNewSource] = React.useState<LeadSource>('Website')
  const [newNotes, setNewNotes] = React.useState('')

  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

  const filteredLeads = React.useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
      const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter

      return matchesSearch && matchesStatus && matchesSource
    })
  }, [leads, searchQuery, statusFilter, sourceFilter])

  const totalValue = filteredLeads.reduce((acc, curr) => acc + curr.value, 0)

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName || !newCompany || !newEmail) {
      toast.error('Please fill all mandatory fields.')
      return
    }

    const newLeadObj: Lead = {
      id: `LEAD-${1000 + leads.length + 1}`,
      name: newName,
      title: 'Prospect',
      company: newCompany,
      email: newEmail,
      phone: newPhone || '+1 (555) 000-0000',
      value: parseFloat(newValue) || 15000,
      source: newSource,
      status: 'new',
      assignedTo: 'Alexander Vance',
      createdAt: new Date().toISOString().split('T')[0],
      notes: newNotes,
    }

    setLeads([newLeadObj, ...leads])
    setIsAddOpen(false)
    toast.success(`Lead ${newName} created successfully!`)

    // reset
    setNewName('')
    setNewCompany('')
    setNewEmail('')
    setNewPhone('')
    setNewValue('')
    setNewNotes('')
  }

  const handleUpdateStatus = (id: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    )
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null))
    }
    toast.success(`Lead status updated to ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales Leads Management"
        description="Capture, qualify and convert opportunities into long-term enterprise clients."
        badge="CRM"
        badgeVariant="teal"
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success('Leads exported to CSV')}
              className="gap-1.5 text-xs text-slate-700"
            >
              <RiDownloadLine className="size-4" />
              <span>Export</span>
            </Button>
            <Button
              size="sm"
              onClick={() => setIsAddOpen(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white gap-1.5 shadow-sm text-xs"
            >
              <RiAddLine className="size-4" />
              <span>New Lead</span>
            </Button>
          </div>
        }
      />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200/80 shadow-2xs">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-medium text-slate-500">Total Leads</CardTitle>
            <div className="text-2xl font-bold text-slate-900 mt-1">{filteredLeads.length}</div>
          </CardHeader>
        </Card>
        <Card className="border-slate-200/80 shadow-2xs">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-medium text-slate-500">Pipeline Value</CardTitle>
            <div className="text-2xl font-bold text-teal-700 mt-1">{currency.format(totalValue)}</div>
          </CardHeader>
        </Card>
        <Card className="border-slate-200/80 shadow-2xs">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-medium text-slate-500">Conversion Rate</CardTitle>
            <div className="text-2xl font-bold text-emerald-600 mt-1">28.6%</div>
          </CardHeader>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="border-slate-200/80 shadow-2xs">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                placeholder="Search by name, company, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs border-slate-200 bg-slate-50/50"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={(val: any) => setStatusFilter(val || 'all')}>
                <SelectTrigger className="h-9 w-36 text-xs border-slate-200">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sourceFilter} onValueChange={(val: any) => setSourceFilter(val || 'all')}>
                <SelectTrigger className="h-9 w-36 text-xs border-slate-200">
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Outbound">Outbound</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card className="border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Lead</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Estimated Value</th>
                <th className="py-3 px-4">Assigned To</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <RiUserSearchLine className="size-8 mx-auto mb-2 opacity-50" />
                    No leads found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">
                      <div>{lead.name}</div>
                      <div className="text-[11px] text-slate-400">{lead.email}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{lead.company}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {currency.format(lead.value)}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{lead.assignedTo}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedLead(lead)}
                        className="h-8 text-teal-600 hover:text-teal-700 hover:bg-teal-50 text-xs font-semibold"
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-slate-900">Lead Dossier</DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Detailed profile and interaction status for {selectedLead.name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg space-y-2 border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{selectedLead.name}</span>
                  <StatusBadge status={selectedLead.status} />
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <RiBuildingLine className="size-3.5 text-slate-400" />
                  <span>{selectedLead.company} • {selectedLead.title}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <RiMailLine className="size-3.5 text-slate-400" />
                  <span>{selectedLead.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <RiPhoneLine className="size-3.5 text-slate-400" />
                  <span>{selectedLead.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Deal Value</span>
                  <div className="text-base font-bold text-teal-700">{currency.format(selectedLead.value)}</div>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Channel</span>
                  <div className="text-base font-semibold text-slate-800">{selectedLead.source}</div>
                </div>
              </div>

              {selectedLead.notes && (
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-700">Account Notes:</span>
                  <p className="text-slate-600 bg-slate-50 p-2.5 rounded-md border border-slate-100 italic">
                    &ldquo;{selectedLead.notes}&rdquo;
                  </p>
                </div>
              )}

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-semibold text-slate-700">Advance Stage:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'] as LeadStatus[]).map((st) => (
                    <Button
                      key={st}
                      variant={selectedLead.status === st ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleUpdateStatus(selectedLead.id, st)}
                      className={selectedLead.status === st ? 'bg-teal-600 text-white text-[11px] h-7' : 'text-[11px] h-7'}
                    >
                      {st.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => setSelectedLead(null)} className="text-xs">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Lead Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleCreateLead}>
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-slate-900">Add New Sales Lead</DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Register a new prospect into the CRM acquisition funnel.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Contact Name *</Label>
                  <Input
                    required
                    placeholder="e.g. John Miller"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Company *</Label>
                  <Input
                    required
                    placeholder="e.g. Acme Health"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Email *</Label>
                  <Input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Phone</Label>
                  <Input
                    placeholder="+1 (555) 000-0000"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Estimated Value ($)</Label>
                  <Input
                    type="number"
                    placeholder="25000"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Lead Source</Label>
                  <Select value={newSource} onValueChange={(val: any) => setNewSource(val || 'Website')}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Referral">Referral</SelectItem>
                      <SelectItem value="Outbound">Outbound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Requirement Notes</Label>
                <Textarea
                  placeholder="Key deliverables, budget constraints or project timeline..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="text-xs resize-none"
                  rows={2}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddOpen(false)} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-teal-600 hover:bg-teal-700 text-white text-xs">
                Save Lead
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}


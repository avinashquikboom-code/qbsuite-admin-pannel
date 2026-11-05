'use client';
import * as React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { OvertimeTable } from '@/components/overtime/OvertimeTable';
import { OvertimeActions } from '@/components/overtime/OvertimeActions';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from '@/components/common/Modal';
import { mockOvertimeRequests } from '@/lib/mock-data';
import { toast } from '@/hooks/use-toast';
import { RiTimeLine, RiMoneyDollarCircleLine, RiCheckboxCircleLine } from '@remixicon/react';
export default function OvertimePage() {
    const [requests, setRequests] = React.useState(mockOvertimeRequests);
    const [activeTab, setActiveTab] = React.useState('all');
    const [search, setSearch] = React.useState('');
    // Confirmation dialogs
    const [confirmDialog, setConfirmDialog] = React.useState({
        open: false,
        type: null,
        item: null,
    });
    // Review note for approval/rejection
    const [reviewNote, setReviewNote] = React.useState('');
    // Details dialog
    const [detailsItem, setDetailsItem] = React.useState(null);
    const counts = {
        all: requests.length,
        pending: requests.filter((r) => r.status === 'pending').length,
        approved: requests.filter((r) => r.status === 'approved').length,
        rejected: requests.filter((r) => r.status === 'rejected').length,
    };
    const filtered = React.useMemo(() => {
        return requests.filter((req) => {
            const matchTab = activeTab === 'all' || req.status === activeTab;
            const matchSearch = req.employeeName.toLowerCase().includes(search.toLowerCase()) ||
                req.project.toLowerCase().includes(search.toLowerCase()) ||
                req.reason.toLowerCase().includes(search.toLowerCase());
            return matchTab && matchSearch;
        });
    }, [requests, activeTab, search]);
    const handleApprove = (req) => {
        setReviewNote('');
        setConfirmDialog({
            open: true,
            type: 'approve',
            item: req,
        });
    };
    const handleReject = (req) => {
        setReviewNote('');
        setConfirmDialog({
            open: true,
            type: 'reject',
            item: req,
        });
    };
    const handleConfirmAction = () => {
        if (!confirmDialog.item || !confirmDialog.type)
            return;
        const isApprove = confirmDialog.type === 'approve';
        const updatedStatus = isApprove ? 'approved' : 'rejected';
        setRequests((prev) => prev.map((r) => r.id === confirmDialog.item.id
            ? {
                ...r,
                status: updatedStatus,
                reviewedBy: 'Alexander Vance',
                reviewDate: new Date().toISOString().split('T')[0],
                reviewNote: reviewNote || (isApprove ? 'Approved by Admin' : 'Rejected by Admin'),
            }
            : r));
        if (isApprove) {
            toast.success(`Overtime Approved for ${confirmDialog.item.employeeName}`, {
                description: `${confirmDialog.item.hours}h credited ($${confirmDialog.item.estimatedAmount}).`,
            });
        }
        else {
            toast.error(`Overtime Rejected for ${confirmDialog.item.employeeName}`);
        }
    };
    const totalHours = requests
        .filter((r) => r.status === 'approved')
        .reduce((acc, curr) => acc + curr.hours, 0);
    const pendingAmount = requests
        .filter((r) => r.status === 'pending')
        .reduce((acc, curr) => acc + curr.estimatedAmount, 0);
    const approvedAmount = requests
        .filter((r) => r.status === 'approved')
        .reduce((acc, curr) => acc + curr.estimatedAmount, 0);
    return (<div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader title="Overtime Approvals" description="Review, verify, and approve extra hours logged by engineering and operational personnel."/>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl border border-amber-100 bg-amber-50/50">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-amber-700 uppercase">
              Pending Approvals
            </span>
            <RiTimeLine className="size-4 text-amber-600"/>
          </div>
          <p className="text-xl font-bold text-amber-800 mt-1">
            {counts.pending} Requests (${pendingAmount.toFixed(2)})
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-brand-light bg-brand-light/50">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-brand-dark uppercase">
              Approved Overtime
            </span>
            <RiCheckboxCircleLine className="size-4 text-brand"/>
          </div>
          <p className="text-xl font-bold text-brand-dark mt-1">
            {counts.approved} Claims (${approvedAmount.toFixed(2)})
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">
              Total Approved Extra Hours
            </span>
            <RiMoneyDollarCircleLine className="size-4 text-brand"/>
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">
            {totalHours} Total Hours
          </p>
        </div>
      </div>

      {/* Action Tabs & Search Toolbar */}
      <OvertimeActions activeTab={activeTab} onTabChange={setActiveTab} search={search} onSearchChange={setSearch} counts={counts}/>

      {/* Overtime Table */}
      <OvertimeTable records={filtered} onApprove={handleApprove} onReject={handleReject} onViewDetails={(req) => setDetailsItem(req)}/>

      {/* Confirmation Dialog */}
      <ConfirmDialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog((prev) => ({ ...prev, open }))} title={confirmDialog.type === 'approve'
            ? `Approve Overtime (${confirmDialog.item?.hours}h)`
            : `Reject Overtime Request`} description={confirmDialog.type === 'approve'
            ? `Authorize payment of $${confirmDialog.item?.estimatedAmount} for ${confirmDialog.item?.employeeName} under project "${confirmDialog.item?.project}".`
            : `Decline overtime request for ${confirmDialog.item?.employeeName}. Please provide a rejection reason.`} variant={confirmDialog.type === 'approve' ? 'success' : 'destructive'} confirmLabel={confirmDialog.type === 'approve' ? 'Approve & Credit' : 'Reject Request'} note={{
            label: confirmDialog.type === 'approve' ? 'Optional Manager Note' : 'Reason for Rejection',
            placeholder: confirmDialog.type === 'approve' ? 'e.g. Critical release crunch approved.' : 'e.g. Prior authorization required.',
            value: reviewNote,
            onChange: setReviewNote,
            required: confirmDialog.type === 'reject',
        }} onConfirm={handleConfirmAction}/>

      {/* Item Details Dialog */}
      <Dialog open={!!detailsItem} onOpenChange={() => setDetailsItem(null)}>
        <DialogContent className="sm:max-w-md bg-white border border-slate-200 shadow-xl rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-900">
              Overtime Request Details ({detailsItem?.id})
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Review verification log and history.
            </DialogDescription>
          </DialogHeader>

          {detailsItem && (<div className="space-y-3 py-3 text-xs">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Employee</span>
                <span className="font-semibold text-slate-900">{detailsItem.employeeName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Project</span>
                <span className="font-semibold text-slate-900">{detailsItem.project}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Calculation</span>
                <span className="font-semibold text-slate-900">
                  {detailsItem.hours} hrs @ ${detailsItem.hourlyRate}/hr x {detailsItem.rateMultiplier} = ${detailsItem.estimatedAmount}
                </span>
              </div>
              <div className="border-b pb-2 space-y-1">
                <span className="text-slate-500">Reason</span>
                <p className="text-slate-800 bg-slate-50 p-2 rounded">{detailsItem.reason}</p>
              </div>
              {detailsItem.reviewedBy && (<div className="bg-slate-50 p-2.5 rounded-lg border space-y-1">
                  <span className="font-semibold text-slate-700">Review Note ({detailsItem.reviewedBy})</span>
                  <p className="text-slate-600 italic">{detailsItem.reviewNote}</p>
                </div>)}
            </div>)}
        </DialogContent>
      </Dialog>
    </div>);
}

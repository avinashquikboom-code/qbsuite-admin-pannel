'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import {
  mockOvertimeRequests,
  mockExpenseClaims,
  mockAnnouncements,
} from '@/lib/mock-data'
import { OvertimeRequest, ExpenseClaim } from '@/lib/types'
import { toast } from '@/hooks/use-toast'
import {
  RiTimeLine,
  RiMoneyDollarCircleLine,
  RiMegaphoneLine,
  RiCheckLine,
  RiCloseLine,
  RiArrowRightLine,
} from '@remixicon/react'

export function RecentActivity() {
  const [overtimes, setOvertimes] = React.useState<OvertimeRequest[]>(mockOvertimeRequests)
  const [expenses, setExpenses] = React.useState<ExpenseClaim[]>(mockExpenseClaims)

  // Dialog state
  const [dialogState, setDialogState] = React.useState<{
    open: boolean
    type: 'approve-ot' | 'reject-ot' | 'approve-exp' | 'reject-exp' | null
    item: OvertimeRequest | ExpenseClaim | null
  }>({
    open: false,
    type: null,
    item: null,
  })

  const handleApproveOt = (ot: OvertimeRequest) => {
    setOvertimes((prev) =>
      prev.map((o) => (o.id === ot.id ? { ...o, status: 'approved' } : o))
    )
    toast.success(`Overtime Approved for ${ot.employeeName}`, {
      description: `${ot.hours} hrs ($${ot.estimatedAmount}) credited.`,
    })
  }

  const handleRejectOt = (ot: OvertimeRequest) => {
    setOvertimes((prev) =>
      prev.map((o) => (o.id === ot.id ? { ...o, status: 'rejected' } : o))
    )
    toast.error(`Overtime Rejected for ${ot.employeeName}`)
  }

  const handleApproveExp = (exp: ExpenseClaim) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === exp.id ? { ...e, status: 'approved' } : e))
    )
    toast.success(`Claim Approved for ${exp.employeeName}`, {
      description: `$${exp.amount.toFixed(2)} approved for reimbursement.`,
    })
  }

  const handleRejectExp = (exp: ExpenseClaim) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === exp.id ? { ...e, status: 'rejected' } : e))
    )
    toast.error(`Claim Rejected for ${exp.employeeName}`)
  }

  return (
    <Card className="border border-slate-200/90 bg-white shadow-xs">
      <CardHeader className="p-5 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-base font-bold text-slate-900">
              Operations & Requests Inbox
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 mt-1">
              Live approvals and recent announcements across QB Suite HRM
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <Tabs defaultValue="overtime" className="w-full">
          <TabsList className="bg-slate-100 p-1 mb-4 h-9">
            <TabsTrigger
              value="overtime"
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-xs font-semibold"
            >
              <RiTimeLine className="size-3.5 mr-1.5" />
              Overtime Requests
            </TabsTrigger>
            <TabsTrigger
              value="expenses"
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-xs font-semibold"
            >
              <RiMoneyDollarCircleLine className="size-3.5 mr-1.5" />
              Expense Claims
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-xs font-semibold"
            >
              <RiMegaphoneLine className="size-3.5 mr-1.5" />
              Announcements
            </TabsTrigger>
          </TabsList>

          {/* Overtime Tab Content */}
          <TabsContent value="overtime" className="space-y-3 m-0">
            {overtimes.slice(0, 4).map((ot) => (
              <div
                key={ot.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="size-9 border border-slate-200">
                    <AvatarImage src={ot.employeeAvatar} alt={ot.employeeName} />
                    <AvatarFallback className="bg-teal-600 text-white text-xs">
                      {ot.employeeName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">
                        {ot.employeeName}
                      </span>
                      <StatusBadge status={ot.status} showIcon={false} />
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {ot.reason}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                      <span>{ot.department}</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-600">
                        {ot.hours}h (${ot.estimatedAmount})
                      </span>
                      <span>•</span>
                      <span>Date: {ot.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                  {ot.status === 'pending' ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() =>
                          setDialogState({
                            open: true,
                            type: 'approve-ot',
                            item: ot,
                          })
                        }
                        className="h-8 bg-teal-600 hover:bg-teal-700 text-white text-xs px-2.5 font-medium"
                      >
                        <RiCheckLine className="size-3.5 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setDialogState({
                            open: true,
                            type: 'reject-ot',
                            item: ot,
                          })
                        }
                        className="h-8 border-slate-200 text-slate-600 hover:text-rose-600 text-xs px-2.5"
                      >
                        <RiCloseLine className="size-3.5 mr-1" />
                        Reject
                      </Button>
                    </>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      Processed
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div className="pt-2 text-right">
              <Link
                href="/hrm/overtime"
                className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                View all overtime requests
                <RiArrowRightLine className="size-3.5" />
              </Link>
            </div>
          </TabsContent>

          {/* Expenses Tab Content */}
          <TabsContent value="expenses" className="space-y-3 m-0">
            {expenses.slice(0, 4).map((exp) => (
              <div
                key={exp.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="size-9 border border-slate-200">
                    <AvatarImage src={exp.employeeAvatar} alt={exp.employeeName} />
                    <AvatarFallback className="bg-teal-600 text-white text-xs">
                      {exp.employeeName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">
                        {exp.employeeName}
                      </span>
                      <StatusBadge status={exp.status} showIcon={false} />
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {exp.description}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                      <span className="font-semibold text-teal-700">
                        {exp.category}
                      </span>
                      <span>•</span>
                      <span className="font-bold text-slate-900">
                        ${exp.amount.toFixed(2)}
                      </span>
                      <span>•</span>
                      <span>{exp.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                  {exp.status === 'pending' ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() =>
                          setDialogState({
                            open: true,
                            type: 'approve-exp',
                            item: exp,
                          })
                        }
                        className="h-8 bg-teal-600 hover:bg-teal-700 text-white text-xs px-2.5 font-medium"
                      >
                        <RiCheckLine className="size-3.5 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setDialogState({
                            open: true,
                            type: 'reject-exp',
                            item: exp,
                          })
                        }
                        className="h-8 border-slate-200 text-slate-600 hover:text-rose-600 text-xs px-2.5"
                      >
                        <RiCloseLine className="size-3.5 mr-1" />
                        Reject
                      </Button>
                    </>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      Processed
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div className="pt-2 text-right">
              <Link
                href="/hrm/expenses"
                className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                View all expense claims
                <RiArrowRightLine className="size-3.5" />
              </Link>
            </div>
          </TabsContent>

          {/* Announcements Tab Content */}
          <TabsContent value="announcements" className="space-y-3 m-0">
            {mockAnnouncements.slice(0, 3).map((ann) => (
              <div
                key={ann.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">
                      {ann.title}
                    </span>
                    {ann.isImportant && (
                      <span className="text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded">
                        Urgent
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0">
                    {ann.createdAt}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {ann.content}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                  <span>Author: {ann.author.name}</span>
                  <span className="font-medium text-teal-700">
                    Audience: {ann.targetAudience}
                  </span>
                </div>
              </div>
            ))}
            <div className="pt-2 text-right">
              <Link
                href="/hrm/announcements"
                className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                Manage announcements
                <RiArrowRightLine className="size-3.5" />
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={dialogState.open}
        onOpenChange={(open) =>
          setDialogState((prev) => ({ ...prev, open }))
        }
        title={
          dialogState.type?.includes('approve')
            ? 'Confirm Approval'
            : 'Confirm Rejection'
        }
        description={
          dialogState.type === 'approve-ot'
            ? `Are you sure you want to approve this overtime request for ${(dialogState.item as OvertimeRequest)?.employeeName}?`
            : dialogState.type === 'reject-ot'
            ? `Are you sure you want to reject this overtime request for ${(dialogState.item as OvertimeRequest)?.employeeName}?`
            : dialogState.type === 'approve-exp'
            ? `Are you sure you want to approve this expense claim of $${(dialogState.item as ExpenseClaim)?.amount}?`
            : `Are you sure you want to reject this expense claim?`
        }
        variant={dialogState.type?.includes('approve') ? 'success' : 'destructive'}
        confirmLabel={
          dialogState.type?.includes('approve') ? 'Yes, Approve' : 'Yes, Reject'
        }
        onConfirm={() => {
          if (dialogState.type === 'approve-ot' && dialogState.item) {
            handleApproveOt(dialogState.item as OvertimeRequest)
          } else if (dialogState.type === 'reject-ot' && dialogState.item) {
            handleRejectOt(dialogState.item as OvertimeRequest)
          } else if (dialogState.type === 'approve-exp' && dialogState.item) {
            handleApproveExp(dialogState.item as ExpenseClaim)
          } else if (dialogState.type === 'reject-exp' && dialogState.item) {
            handleRejectExp(dialogState.item as ExpenseClaim)
          }
        }}
      />
    </Card>
  )
}

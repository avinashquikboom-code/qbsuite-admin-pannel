'use client'

import * as React from 'react'
import { ExpenseClaim } from '@/lib/types'
import { DataTable } from '@/components/shared/DataTable'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  RiCheckLine,
  RiCloseLine,
  RiAttachmentLine,
  RiEyeLine,
} from '@remixicon/react'

interface ExpenseTableProps {
  claims: ExpenseClaim[]
  onApprove: (claim: ExpenseClaim) => void
  onReject: (claim: ExpenseClaim) => void
  onViewDetail: (claim: ExpenseClaim) => void
}

export function ExpenseTable({
  claims,
  onApprove,
  onReject,
  onViewDetail,
}: ExpenseTableProps) {
  const columns = [
    {
      header: 'Claim ID & Employee',
      cell: (exp: ExpenseClaim) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-9 border border-slate-200">
            <AvatarImage src={exp.employeeAvatar} alt={exp.employeeName} />
            <AvatarFallback className="bg-teal-600 text-white text-xs">
              {exp.employeeName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 leading-tight">
              {exp.employeeName}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {exp.id} • {exp.department}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      cell: (exp: ExpenseClaim) => (
        <Badge
          variant="outline"
          className="bg-slate-50 text-teal-800 border-teal-200 text-xs font-medium py-0.5"
        >
          {exp.category}
        </Badge>
      ),
    },
    {
      header: 'Amount',
      cell: (exp: ExpenseClaim) => (
        <span className="font-bold text-sm text-slate-900">
          ${exp.amount.toFixed(2)}
        </span>
      ),
    },
    {
      header: 'Date Submitted',
      cell: (exp: ExpenseClaim) => (
        <div className="flex flex-col text-xs">
          <span className="font-medium text-slate-700">{exp.date}</span>
          <span className="text-slate-400">Sub: {exp.submittedDate}</span>
        </div>
      ),
    },
    {
      header: 'Receipt',
      cell: (exp: ExpenseClaim) => (
        <button
          onClick={() => onViewDetail(exp)}
          className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 font-medium group"
        >
          <RiAttachmentLine className="size-3.5 text-slate-400 group-hover:text-teal-600" />
          <span className="truncate max-w-[120px]">{exp.receiptName}</span>
        </button>
      ),
    },
    {
      header: 'Status',
      cell: (exp: ExpenseClaim) => <StatusBadge status={exp.status} />,
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (exp: ExpenseClaim) => (
        <div className="flex items-center justify-end gap-1.5">
          {exp.status === 'pending' ? (
            <>
              <Button
                size="sm"
                onClick={() => onApprove(exp)}
                className="h-7.5 px-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold"
              >
                <RiCheckLine className="size-3.5 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onReject(exp)}
                className="h-7.5 px-2 border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 text-xs"
              >
                <RiCloseLine className="size-3.5" />
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onViewDetail(exp)}
              className="h-7.5 text-xs text-slate-600 hover:text-slate-900"
            >
              <RiEyeLine className="size-3.5 mr-1 text-slate-400" />
              Review
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={claims}
      pageSize={8}
      emptyState={
        <div className="py-8 text-center text-slate-500">
          No expense claims found matching filter criteria.
        </div>
      }
    />
  )
}

'use client'

import * as React from 'react'
import { OvertimeRequest } from '@/lib/types'
import { DataTable } from '@/components/shared/DataTable'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { RiCheckLine, RiCloseLine, RiInformationLine } from '@remixicon/react'

interface OvertimeTableProps {
  records: OvertimeRequest[]
  onApprove: (request: OvertimeRequest) => void
  onReject: (request: OvertimeRequest) => void
  onViewDetails: (request: OvertimeRequest) => void
}

export function OvertimeTable({
  records,
  onApprove,
  onReject,
  onViewDetails,
}: OvertimeTableProps) {
  const columns = [
    {
      header: 'Employee',
      cell: (ot: OvertimeRequest) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-9 border border-slate-200">
            <AvatarImage src={ot.employeeAvatar} alt={ot.employeeName} />
            <AvatarFallback className="bg-teal-600 text-white text-xs">
              {ot.employeeName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 leading-tight">
              {ot.employeeName}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {ot.employeeId} • {ot.department}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'Date & Project',
      cell: (ot: OvertimeRequest) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 text-xs">
            {ot.project}
          </span>
          <span className="text-xs text-slate-400">{ot.date}</span>
        </div>
      ),
    },
    {
      header: 'Hours & Rate',
      cell: (ot: OvertimeRequest) => (
        <div className="flex flex-col text-xs">
          <span className="font-bold text-slate-900">
            {ot.hours} hrs ({ot.rateMultiplier}x)
          </span>
          <span className="text-slate-400">${ot.hourlyRate}/hr base</span>
        </div>
      ),
    },
    {
      header: 'Est. Amount',
      cell: (ot: OvertimeRequest) => (
        <span className="font-bold text-sm text-teal-700">
          ${ot.estimatedAmount.toFixed(2)}
        </span>
      ),
    },
    {
      header: 'Reason',
      cell: (ot: OvertimeRequest) => (
        <p className="text-xs text-slate-600 max-w-xs truncate" title={ot.reason}>
          {ot.reason}
        </p>
      ),
    },
    {
      header: 'Status',
      cell: (ot: OvertimeRequest) => <StatusBadge status={ot.status} />,
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (ot: OvertimeRequest) => (
        <div className="flex items-center justify-end gap-1.5">
          {ot.status === 'pending' ? (
            <>
              <Button
                size="sm"
                onClick={() => onApprove(ot)}
                className="h-7.5 px-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold"
              >
                <RiCheckLine className="size-3.5 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onReject(ot)}
                className="h-7.5 px-2 border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 text-xs"
              >
                <RiCloseLine className="size-3.5" />
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onViewDetails(ot)}
              className="h-7.5 text-xs text-slate-500 hover:text-slate-800"
            >
              <RiInformationLine className="size-3.5 mr-1 text-slate-400" />
              Details
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={records}
      pageSize={8}
      emptyState={
        <div className="py-8 text-center text-slate-500">
          No overtime requests found in this view.
        </div>
      }
    />
  )
}

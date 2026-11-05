'use client';
import * as React from 'react';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import { RiFileTextLine, RiCheckDoubleLine } from '@remixicon/react';
export function PayrollTable({ records, onViewPayslip, onMarkPaid, }) {
    const columns = [
        {
            header: 'Employee',
            cell: (rec) => (<div className="flex items-center gap-3">
          <Avatar className="size-9 border border-slate-200">
            <AvatarImage src={rec.employeeAvatar} alt={rec.employeeName}/>
            <AvatarFallback className="bg-teal-600 text-white text-xs">
              {rec.employeeName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 leading-tight">
              {rec.employeeName}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {rec.employeeId} • {rec.department}
            </span>
          </div>
        </div>),
        },
        {
            header: 'Basic Salary',
            cell: (rec) => (<span className="text-xs font-medium text-slate-800">
          ${rec.basicSalary.toLocaleString()}
        </span>),
        },
        {
            header: 'Allowances',
            cell: (rec) => (<span className="text-xs font-medium text-slate-600">
          ${rec.allowances.toLocaleString()}
        </span>),
        },
        {
            header: 'Overtime & Claims',
            cell: (rec) => (<div className="flex flex-col text-xs">
          <span className="text-amber-700 font-medium">
            +${rec.overtimePay.toFixed(0)} OT
          </span>
          <span className="text-teal-700 font-medium">
            +${rec.reimbursements.toFixed(0)} Claim
          </span>
        </div>),
        },
        {
            header: 'Gross Pay',
            cell: (rec) => (<span className="font-bold text-xs text-slate-900">
          ${rec.grossPay.toLocaleString()}
        </span>),
        },
        {
            header: 'Deductions',
            cell: (rec) => (<div className="flex flex-col text-xs text-rose-600">
          <span className="font-semibold">
            -${rec.totalDeductions.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400">
            Tax: ${rec.deductions.tax}
          </span>
        </div>),
        },
        {
            header: 'Net Payable',
            cell: (rec) => (<span className="font-extrabold text-sm text-teal-800">
          ${rec.netPay.toLocaleString()}
        </span>),
        },
        {
            header: 'Status',
            cell: (rec) => <StatusBadge status={rec.status}/>,
        },
        {
            header: 'Actions',
            className: 'text-right',
            cell: (rec) => (<div className="flex items-center justify-end gap-1.5">
          <Button size="sm" variant="outline" onClick={() => onViewPayslip(rec)} className="h-7.5 px-2.5 border-slate-200 text-slate-700 hover:text-teal-700 hover:bg-teal-50 text-xs">
            <RiFileTextLine className="size-3.5 mr-1 text-slate-400"/>
            Payslip
          </Button>
          {rec.status === 'pending' && onMarkPaid && (<Button size="sm" onClick={() => onMarkPaid(rec)} className="h-7.5 px-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold">
              <RiCheckDoubleLine className="size-3.5 mr-1"/>
              Pay
            </Button>)}
        </div>),
        },
    ];
    return (<DataTable columns={columns} data={records} pageSize={8} emptyState={<div className="py-8 text-center text-slate-500">
          No payroll records found for this period.
        </div>}/>);
}

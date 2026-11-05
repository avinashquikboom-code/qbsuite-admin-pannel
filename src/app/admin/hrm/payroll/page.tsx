'use client'

import * as React from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { PayrollSummary } from '@/components/payroll/PayrollSummary'
import { PayrollTable } from '@/components/payroll/PayrollTable'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { mockPayrollRecords } from '@/lib/mock-data'
import { PayrollRecord } from '@/lib/types'
import { toast } from '@/hooks/use-toast'
import {
  RiBankCardLine,
  RiDownloadLine,
  RiPrinterLine,
  RiMailLine,
  RiCheckDoubleLine,
} from '@remixicon/react'

export default function PayrollPage() {
  const [records, setRecords] = React.useState<PayrollRecord[]>(mockPayrollRecords)
  const [selectedMonth, setSelectedMonth] = React.useState('March 2026')
  const [selectedRecord, setSelectedRecord] = React.useState<PayrollRecord | null>(null)
  const [payslipOpen, setPayslipOpen] = React.useState(false)
  const [runBatchOpen, setRunBatchOpen] = React.useState(false)

  const handleRunPayrollBatch = () => {
    setRecords((prev) =>
      prev.map((r) => ({
        ...r,
        status: 'paid',
        paymentDate: new Date().toISOString().split('T')[0],
      }))
    )
    setRunBatchOpen(false)
    toast.success('Payroll Batch Executed Successfully', {
      description: `Disbursed payments to all ${records.length} employees for ${selectedMonth}.`,
    })
  }

  const handleMarkPaid = (rec: PayrollRecord) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === rec.id
          ? {
              ...r,
              status: 'paid',
              paymentDate: new Date().toISOString().split('T')[0],
            }
          : r
      )
    )
    toast.success(`Disbursed salary of $${rec.netPay.toLocaleString()} to ${rec.employeeName}`)
  }

  const handleViewPayslip = (rec: PayrollRecord) => {
    setSelectedRecord(rec)
    setPayslipOpen(true)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Payroll & Compensation Management"
        description="Calculate monthly salaries, tax withholding, overtime credits, reimbursements, and payslip generation."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success('Exported Monthly Payroll to Excel/CSV')}
              className="border-slate-200 text-slate-700 hover:text-teal-700 text-xs h-9"
            >
              <RiDownloadLine className="size-3.5 mr-1 text-slate-400" />
              Export Bank File
            </Button>
            <Button
              size="sm"
              onClick={() => setRunBatchOpen(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs h-9"
            >
              <RiBankCardLine className="size-4 mr-1.5" />
              Run Payroll Batch
            </Button>
          </div>
        }
      />

      {/* Summary Cards */}
      <PayrollSummary records={records} />

      {/* Payroll Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">
              Salary Register — {selectedMonth}
            </h3>
            <Badge className="bg-teal-50 text-teal-700 border-teal-200 text-[10px]">
              Ready for processing
            </Badge>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Cutoff Date: Mar 25, 2026
          </span>
        </div>

        <PayrollTable
          records={records}
          onViewPayslip={handleViewPayslip}
          onMarkPaid={handleMarkPaid}
        />
      </div>

      {/* Payslip Modal Dialog */}
      <Dialog open={payslipOpen} onOpenChange={setPayslipOpen}>
        <DialogContent className="sm:max-w-xl bg-white border border-slate-200 shadow-2xl rounded-2xl p-6">
          {selectedRecord && (
            <div className="space-y-5 text-xs">
              {/* Slip Header */}
              <div className="flex items-start justify-between border-b pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-lg text-teal-700 tracking-tight">
                      QB Suite Inc.
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-1 rounded">
                      Official Payslip
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    100 Montgomery St, Suite 1400, San Francisco, CA
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-semibold text-slate-900">
                    {selectedRecord.id}
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Pay Period: {selectedRecord.month}
                  </p>
                </div>
              </div>

              {/* Employee Summary */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">
                    Employee Name
                  </span>
                  <span className="font-bold text-slate-900 text-sm">
                    {selectedRecord.employeeName}
                  </span>
                  <span className="text-slate-500 block">
                    {selectedRecord.designation} • {selectedRecord.department}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase">
                    Disbursement Account
                  </span>
                  <span className="font-mono text-slate-800">
                    {selectedRecord.bankAccount}
                  </span>
                  <span className="text-emerald-700 font-semibold block uppercase text-[10px]">
                    Status: {selectedRecord.status}
                  </span>
                </div>
              </div>

              {/* Earnings vs Deductions Table */}
              <div className="grid grid-cols-2 gap-4">
                {/* Earnings */}
                <div className="space-y-1.5">
                  <span className="font-bold text-slate-900 uppercase text-[11px] pb-1 border-b block">
                    Earnings
                  </span>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Basic Salary</span>
                    <span className="font-semibold text-slate-800">
                      ${selectedRecord.basicSalary.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Allowances</span>
                    <span className="font-semibold text-slate-800">
                      ${selectedRecord.allowances.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Overtime Pay</span>
                    <span className="font-semibold text-amber-700">
                      +${selectedRecord.overtimePay.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reimbursements</span>
                    <span className="font-semibold text-teal-700">
                      +${selectedRecord.reimbursements.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold">
                    <span>Total Gross</span>
                    <span>${selectedRecord.grossPay.toLocaleString()}</span>
                  </div>
                </div>

                {/* Deductions */}
                <div className="space-y-1.5">
                  <span className="font-bold text-slate-900 uppercase text-[11px] pb-1 border-b block">
                    Deductions
                  </span>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Income Tax (FIT)</span>
                    <span className="font-semibold text-rose-600">
                      -${selectedRecord.deductions.tax}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Health Insurance</span>
                    <span className="font-semibold text-rose-600">
                      -${selectedRecord.deductions.insurance}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Provident / 401(k)</span>
                    <span className="font-semibold text-rose-600">
                      -${selectedRecord.deductions.providentFund}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Other Pre-Tax</span>
                    <span className="font-semibold text-rose-600">
                      -${selectedRecord.deductions.other}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold text-rose-700">
                    <span>Total Deductions</span>
                    <span>-${selectedRecord.totalDeductions.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Net Pay Callout */}
              <div className="flex items-center justify-between p-3.5 bg-teal-50 rounded-xl border border-teal-200">
                <div>
                  <span className="text-teal-800 font-semibold text-[11px] uppercase tracking-wider block">
                    Net Take-Home Pay
                  </span>
                  <span className="text-xs text-teal-600">
                    Direct Deposit into {selectedRecord.bankAccount}
                  </span>
                </div>
                <span className="text-2xl font-black text-teal-900">
                  ${selectedRecord.netPay.toLocaleString()}
                </span>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success(`Payslip sent to ${selectedRecord.employeeName}'s email`)}
                  className="h-8 text-xs border-slate-200"
                >
                  <RiMailLine className="size-3.5 mr-1" />
                  Email Payslip
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success('Sending to connected office printer...')}
                    className="h-8 text-xs border-slate-200"
                  >
                    <RiPrinterLine className="size-3.5 mr-1" />
                    Print
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      toast.success(`Downloaded ${selectedRecord.id}.pdf`)
                      setPayslipOpen(false)
                    }}
                    className="h-8 bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs"
                  >
                    <RiDownloadLine className="size-3.5 mr-1" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Run Batch Confirmation Dialog */}
      <ConfirmDialog
        open={runBatchOpen}
        onOpenChange={setRunBatchOpen}
        title="Execute Monthly Payroll Batch"
        description={`This will trigger automated disbursement for all ${records.length} employees in ${selectedMonth} totaling $${records.reduce((acc, r) => acc + r.netPay, 0).toLocaleString()}.`}
        variant="success"
        confirmLabel="Confirm & Disburse Funds"
        onConfirm={handleRunPayrollBatch}
      />
    </div>
  )
}

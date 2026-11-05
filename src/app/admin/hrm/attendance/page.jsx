'use client';
import * as React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { AttendanceFilters } from '@/components/attendance/AttendanceFilters';
import { AttendanceTable } from '@/components/attendance/AttendanceTable';
import { Button } from '@/components/common/Button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '@/components/common/Modal';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/common/Select';
import { mockAttendanceRecords } from '@/lib/mock-data';
import { toast } from '@/hooks/use-toast';
import { RiCalendarCheckLine, RiAlertLine, RiCalendarCloseLine, RiCloseCircleLine, } from '@remixicon/react';
export default function AttendancePage() {
    const [records, setRecords] = React.useState(mockAttendanceRecords);
    const [search, setSearch] = React.useState('');
    const [selectedDept, setSelectedDept] = React.useState('All Departments');
    const [selectedStatus, setSelectedStatus] = React.useState('all');
    // Edit / Manual adjustment dialog
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [currentRecord, setCurrentRecord] = React.useState(null);
    const [punchInVal, setPunchInVal] = React.useState('');
    const [punchOutVal, setPunchOutVal] = React.useState('');
    const [statusVal, setStatusVal] = React.useState('present');
    const filtered = React.useMemo(() => {
        return records.filter((rec) => {
            const matchSearch = rec.employeeName.toLowerCase().includes(search.toLowerCase()) ||
                rec.employeeId.toLowerCase().includes(search.toLowerCase());
            const matchDept = selectedDept === 'All Departments' || rec.department === selectedDept;
            const matchStatus = selectedStatus === 'all' || rec.status === selectedStatus;
            return matchSearch && matchDept && matchStatus;
        });
    }, [records, search, selectedDept, selectedStatus]);
    const handleOpenEdit = (rec) => {
        setCurrentRecord(rec);
        setPunchInVal(rec.punchIn || '09:00 AM');
        setPunchOutVal(rec.punchOut || '05:00 PM');
        setStatusVal(rec.status);
        setEditDialogOpen(true);
    };
    const handleSaveAdjustment = (e) => {
        e.preventDefault();
        if (!currentRecord)
            return;
        setRecords((prev) => prev.map((r) => r.id === currentRecord.id
            ? {
                ...r,
                punchIn: punchInVal,
                punchOut: punchOutVal,
                status: statusVal,
            }
            : r));
        setEditDialogOpen(false);
        toast.success('Attendance punch updated', {
            description: `Manual punch adjustment saved for ${currentRecord.employeeName}.`,
        });
    };
    const handleExport = () => {
        toast.success('Attendance Report Exported', {
            description: `Exported ${filtered.length} records to CSV.`,
        });
    };
    const presentCount = records.filter((r) => r.status === 'present').length;
    const lateCount = records.filter((r) => r.status === 'late').length;
    const onLeaveCount = records.filter((r) => r.status === 'on_leave').length;
    const absentCount = records.filter((r) => r.status === 'absent').length;
    return (<div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader title="Attendance & Time Clock" description="Daily punch in/out timestamps, break tracking, working duration, and automated late arrival detection." actions={<Button size="sm" onClick={handleExport} className="bg-brand hover:bg-brand-dark text-primary-foreground font-medium text-xs h-9">
            <RiCalendarCheckLine className="size-4 mr-1.5"/>
            Generate Timesheet
          </Button>}/>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-brand-light bg-brand-light/50">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-brand-dark uppercase">
              Present Today
            </span>
            <RiCalendarCheckLine className="size-4 text-brand"/>
          </div>
          <p className="text-xl font-bold text-brand-dark mt-1">
            {presentCount} Employees
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-amber-100 bg-amber-50/50">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-amber-700 uppercase">
              Late Arrivals
            </span>
            <RiAlertLine className="size-4 text-amber-600"/>
          </div>
          <p className="text-xl font-bold text-amber-800 mt-1">
            {lateCount} Employees
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-brand-light bg-brand-light/50">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-brand-dark uppercase">
              Approved Leave
            </span>
            <RiCalendarCloseLine className="size-4 text-brand"/>
          </div>
          <p className="text-xl font-bold text-brand-dark mt-1">
            {onLeaveCount} Employees
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/50">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-rose-700 uppercase">
              Unexcused Absent
            </span>
            <RiCloseCircleLine className="size-4 text-rose-600"/>
          </div>
          <p className="text-xl font-bold text-rose-800 mt-1">
            {absentCount} Employees
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <AttendanceFilters search={search} onSearchChange={setSearch} selectedDept={selectedDept} onDeptChange={setSelectedDept} selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} onExport={handleExport}/>

      {/* Attendance Table */}
      <AttendanceTable records={filtered} onAdjustPunch={handleOpenEdit}/>

      {/* Manual Adjustment Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white border border-slate-200 shadow-xl rounded-xl">
          <form onSubmit={handleSaveAdjustment}>
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-slate-900">
                Adjust Attendance Log
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Modify recorded punch times for {currentRecord?.employeeName} ({currentRecord?.employeeId}).
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-medium">Punch In Time</Label>
                  <Input value={punchInVal} onChange={(e) => setPunchInVal(e.target.value)} placeholder="e.g. 08:50 AM" className="h-8 text-xs font-mono"/>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium">Punch Out Time</Label>
                  <Input value={punchOutVal} onChange={(e) => setPunchOutVal(e.target.value)} placeholder="e.g. 05:30 PM" className="h-8 text-xs font-mono"/>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium">Attendance Status</Label>
                <Select value={statusVal} onValueChange={(val) => setStatusVal(val)}>
                  <SelectTrigger className="h-8 text-xs w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present" className="text-xs">
                      Present
                    </SelectItem>
                    <SelectItem value="late" className="text-xs">
                      Late
                    </SelectItem>
                    <SelectItem value="half_day" className="text-xs">
                      Half Day
                    </SelectItem>
                    <SelectItem value="on_leave" className="text-xs">
                      On Leave
                    </SelectItem>
                    <SelectItem value="absent" className="text-xs">
                      Absent
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="border-t border-slate-100 pt-3">
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)} className="h-8 text-xs">
                Cancel
              </Button>
              <Button type="submit" className="h-8 bg-brand hover:bg-brand-dark text-primary-foreground text-xs font-semibold">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>);
}

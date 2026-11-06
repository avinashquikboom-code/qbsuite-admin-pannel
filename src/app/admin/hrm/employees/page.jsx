'use client';
import { CURRENCY_CODE, CURRENCY_SYMBOL } from "@/lib/currency";

import { FontAwesomeIcon } from '@/components/icons/FontAwesomeIcon';
import * as React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { EmployeeTable } from '@/modules/hrm/components/employees/EmployeeTable';
import { EmployeeDetail } from '@/modules/hrm/components/employees/EmployeeDetail';
import { Button } from '@/components/common/Button';
import { FormDrawer, DrawerFormField } from '@/components/common/drawers/FormDrawer';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/common/Select';
import { mockEmployees } from '@/lib/mock-data';
import { toast } from '@/hooks/use-toast';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
export default function EmployeesPage() {
    const [employees, setEmployees] = React.useState(mockEmployees);
    const [selectedEmployee, setSelectedEmployee] = React.useState(null);
    const [detailOpen, setDetailOpen] = React.useState(false);
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    // Add Employee Form State
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: 'Engineering',
        designation: '',
        basicSalary: '',
        location: 'San Francisco, CA (HQ)',
        employmentType: 'Full-Time',
    });
    const handleSelectEmployee = (emp) => {
        setSelectedEmployee(emp);
        setDetailOpen(true);
    };
    const handleAddEmployee = (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.email) {
            toast.error('Please fill in required fields');
            return;
        }
        const newEmp = {
            id: `EMP-${1000 + employees.length + 1}`,
            firstName: formData.firstName,
            lastName: formData.lastName,
            name: `${formData.firstName} ${formData.lastName}`,
            avatar: `https://images.unsplash.com/photo-${1534528741775 + employees.length}?w=150`,
            email: formData.email,
            phone: formData.phone || '+1 (555) 000-0000',
            department: formData.department,
            designation: formData.designation || 'Specialist',
            status: 'active',
            joinDate: new Date().toISOString().split('T')[0],
            employmentType: formData.employmentType,
            location: formData.location,
            salary: {
                basic: Number(formData.basicSalary) || 8000,
                allowances: 800,
                hourlyRate: 50,
                currency: CURRENCY_CODE,
            },
            bankDetails: {
                accountName: `${formData.firstName} ${formData.lastName}`,
                accountNumber: '•••• •••• ' + Math.floor(1000 + Math.random() * 9000),
                bankName: 'Chase Bank',
                routingNumber: '111000614',
            },
            emergencyContact: {
                name: 'Primary Contact',
                relationship: 'Family',
                phone: '+1 (555) 999-9999',
            },
        };
        setEmployees((prev) => [newEmp, ...prev]);
        setAddDialogOpen(false);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            department: 'Engineering',
            designation: '',
            basicSalary: '',
            location: 'San Francisco, CA (HQ)',
            employmentType: 'Full-Time',
        });
        toast.success('Employee Added Successfully', {
            description: `${newEmp.name} (${newEmp.id}) onboarded to ${newEmp.department}.`,
        });
    };
    const activeCount = employees.filter((e) => e.status === 'active').length;
    const onLeaveCount = employees.filter((e) => e.status === 'on_leave').length;
    const inactiveCount = employees.filter((e) => e.status === 'inactive').length;
    return (<div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader title="Employee Directory" description="Manage company personnel, designations, salary packages, and employment status." actions={<Button onClick={() => setAddDialogOpen(true)} className="bg-brand hover:bg-brand-dark text-primary-foreground font-medium text-xs h-9">
            <FontAwesomeIcon icon={faUserPlus} className="size-4 mr-1.5"/>
            Add New Employee
          </Button>}/>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
          <p className="text-[11px] font-semibold text-slate-400 uppercase">
            Total Headcount
          </p>
          <p className="text-xl font-bold text-slate-900 mt-0.5">
            {employees.length}
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-brand-light bg-brand-light/50">
          <p className="text-[11px] font-semibold text-brand-dark uppercase">
            Active Status
          </p>
          <p className="text-xl font-bold text-brand-dark mt-0.5">
            {activeCount}
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-brand-light bg-brand-light/50">
          <p className="text-[11px] font-semibold text-brand-dark uppercase">
            On Leave
          </p>
          <p className="text-xl font-bold text-brand-dark mt-0.5">
            {onLeaveCount}
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/50">
          <p className="text-[11px] font-semibold text-rose-700 uppercase">
            Inactive / Suspended
          </p>
          <p className="text-xl font-bold text-rose-800 mt-0.5">
            {inactiveCount}
          </p>
        </div>
      </div>

      {/* Employee Listing Table */}
      <EmployeeTable employees={employees} onSelectEmployee={handleSelectEmployee}/>

      {/* Employee Detail Slide-Out */}
      <EmployeeDetail employee={selectedEmployee} open={detailOpen} onOpenChange={setDetailOpen}/>

      {/* Add Employee FormDrawer */}
      <FormDrawer
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        title="Onboard New Employee"
        description="Enter professional and compensation details to add a team member."
        onSubmit={handleAddEmployee}
        submitLabel="Save & Onboard"
        size="complex"
      >
        <div className="grid grid-cols-2 gap-3">
          <DrawerFormField label="First Name" required>
            <Input required placeholder="e.g. John" value={formData.firstName} onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))} className="h-9 text-xs"/>
          </DrawerFormField>

          <DrawerFormField label="Last Name" required>
            <Input required placeholder="e.g. Doe" value={formData.lastName} onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))} className="h-9 text-xs"/>
          </DrawerFormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <DrawerFormField label="Work Email" required>
            <Input required type="email" placeholder="john.doe@qbsuite.com" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} className="h-9 text-xs"/>
          </DrawerFormField>

          <DrawerFormField label="Phone">
            <Input placeholder="+1 (555) 000-0000" value={formData.phone} onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} className="h-9 text-xs"/>
          </DrawerFormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <DrawerFormField label="Department">
            <Select value={formData.department} onValueChange={(val) => setFormData((prev) => ({ ...prev, department: val }))}>
              <SelectTrigger className="h-9 text-xs w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Engineering" className="text-xs">
                  Engineering
                </SelectItem>
                <SelectItem value="Product & Design" className="text-xs">
                  Product & Design
                </SelectItem>
                <SelectItem value="Human Resources" className="text-xs">
                  Human Resources
                </SelectItem>
                <SelectItem value="Finance" className="text-xs">
                  Finance
                </SelectItem>
                <SelectItem value="Sales" className="text-xs">
                  Sales
                </SelectItem>
                <SelectItem value="Marketing" className="text-xs">
                  Marketing
                </SelectItem>
                <SelectItem value="Operations" className="text-xs">
                  Operations
                </SelectItem>
              </SelectContent>
            </Select>
          </DrawerFormField>

          <DrawerFormField label="Designation">
            <Input placeholder="e.g. Lead Engineer" value={formData.designation} onChange={(e) => setFormData((prev) => ({ ...prev, designation: e.target.value }))} className="h-9 text-xs"/>
          </DrawerFormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <DrawerFormField label={`Monthly Basic (${CURRENCY_SYMBOL})`}>
            <Input type="number" placeholder="e.g. 9500" value={formData.basicSalary} onChange={(e) => setFormData((prev) => ({ ...prev, basicSalary: e.target.value }))} className="h-9 text-xs"/>
          </DrawerFormField>

          <DrawerFormField label="Location">
            <Input placeholder="San Francisco, CA" value={formData.location} onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))} className="h-9 text-xs"/>
          </DrawerFormField>
        </div>
      </FormDrawer>
    </div>);
}

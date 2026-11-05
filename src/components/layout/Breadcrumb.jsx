'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiArrowRightSLine, RiHome4Line } from '@remixicon/react';
export function Breadcrumb() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);
    const getSegmentName = (segment) => {
        switch (segment) {
            case 'admin':
                return 'Admin';
            case 'dashboard':
                return 'Dashboard';
            case 'hrm':
                return 'HRM';
            case 'crm':
                return 'CRM';
            case 'suite':
                return 'Suite Overview';
            case 'employees':
                return 'Employees';
            case 'attendance':
                return 'Attendance';
            case 'break-management':
                return 'Break Management';
            case 'overtime':
                return 'Overtime Approvals';
            case 'expense-claims':
            case 'expenses':
                return 'Expense Claims';
            case 'leaves':
                return 'Leave Management';
            case 'payroll':
                return 'Payroll';
            case 'salary-slips':
                return 'Salary Slips';
            case 'announcements':
                return 'Announcements';
            case 'leads':
                return 'Leads';
            case 'customers':
            case 'contacts':
                return 'Customers';
            case 'campaigns':
                return 'Campaigns';
            case 'whatsapp':
                return 'WhatsApp Marketing';
            case 'meta-integration':
                return 'Meta Integration';
            case 'reports':
                return 'Reports & Analytics';
            case 'settings':
                return 'Settings';
            default:
                return segment.charAt(0).toUpperCase() + segment.slice(1);
        }
    };
    return (<nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
      <Link href="/" className="flex items-center gap-1 text-slate-500 hover:text-brand-dark transition-colors">
        <RiHome4Line className="size-3.5 text-slate-400"/>
        <span className="hidden sm:inline">QB Suite</span>
      </Link>

      {pathSegments.length > 0 && (<RiArrowRightSLine className="size-3.5 text-slate-400 shrink-0"/>)}

      {pathSegments.map((segment, index) => {
            const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            return (<React.Fragment key={url}>
            {isLast ? (<span className="font-semibold text-slate-800">
                {getSegmentName(segment)}
              </span>) : (<Link href={url} className="text-slate-500 hover:text-brand-dark transition-colors">
                {getSegmentName(segment)}
              </Link>)}
            {!isLast && (<RiArrowRightSLine className="size-3.5 text-slate-400 shrink-0"/>)}
          </React.Fragment>);
        })}
    </nav>);
}

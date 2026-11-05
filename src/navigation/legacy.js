import { RiBankCardLine, RiCalendarCheckLine, RiCalendarCloseLine, RiCupLine, RiDashboard2Line, RiFileTextLine, RiMoneyDollarCircleLine, RiNotificationBadgeLine, RiPieChartLine, RiTeamLine, RiTimeLine } from '@remixicon/react';
import { mockKpiData } from '@/lib/mock-data';
export const navigation = [
        {
            name: 'HRM Dashboard',
            href: '/admin/hrm/dashboard',
            icon: RiDashboard2Line,
            matchExact: true,
        },
        {
            name: 'Employees',
            href: '/admin/hrm/employees',
            icon: RiTeamLine,
            badge: '10',
        },
        {
            name: 'Attendance',
            href: '/admin/hrm/attendance',
            icon: RiCalendarCheckLine,
        },
        {
            name: 'Break Management',
            href: '/admin/hrm/break-management',
            icon: RiCupLine,
        },
        {
            name: 'Overtime Approvals',
            href: '/admin/hrm/overtime',
            icon: RiTimeLine,
            badge: mockKpiData.pendingOvertime.toString(),
            badgeVariant: 'warning',
        },
        {
            name: 'Expense Claims',
            href: '/admin/hrm/expense-claims',
            icon: RiMoneyDollarCircleLine,
            badge: mockKpiData.pendingExpenses.toString(),
            badgeVariant: 'warning',
        },
        {
            name: 'Leave Management',
            href: '/admin/hrm/leaves',
            icon: RiCalendarCloseLine,
        },
        {
            name: 'Payroll',
            href: '/admin/hrm/payroll',
            icon: RiBankCardLine,
        },
        {
            name: 'Salary Slips',
            href: '/admin/hrm/salary-slips',
            icon: RiFileTextLine,
        },
        {
            name: 'Announcements',
            href: '/admin/hrm/announcements',
            icon: RiNotificationBadgeLine,
        },
        {
            name: 'HRM Reports',
            href: '/admin/hrm/reports',
            icon: RiPieChartLine,
        },
    ];

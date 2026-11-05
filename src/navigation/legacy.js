import { faBell, faChartLine, faClock, faDollarSign, faGauge, faMugHot, faUsers, faWallet } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck, faCalendarXmark, faFileLines } from '@fortawesome/free-regular-svg-icons';
import { mockKpiData } from '@/lib/mock-data';
export const navigation = [
        {
            name: 'HRM Dashboard',
            href: '/admin/hrm/dashboard',
            icon: faGauge,
            matchExact: true,
        },
        {
            name: 'Employees',
            href: '/admin/hrm/employees',
            icon: faUsers,
            badge: '10',
        },
        {
            name: 'Attendance',
            href: '/admin/hrm/attendance',
            icon: faCalendarCheck,
        },
        {
            name: 'Break Management',
            href: '/admin/hrm/break-management',
            icon: faMugHot,
        },
        {
            name: 'Overtime Approvals',
            href: '/admin/hrm/overtime',
            icon: faClock,
            badge: mockKpiData.pendingOvertime.toString(),
            badgeVariant: 'warning',
        },
        {
            name: 'Expense Claims',
            href: '/admin/hrm/expense-claims',
            icon: faDollarSign,
            badge: mockKpiData.pendingExpenses.toString(),
            badgeVariant: 'warning',
        },
        {
            name: 'Leave Management',
            href: '/admin/hrm/leaves',
            icon: faCalendarXmark,
        },
        {
            name: 'Payroll',
            href: '/admin/hrm/payroll',
            icon: faWallet,
        },
        {
            name: 'Salary Slips',
            href: '/admin/hrm/salary-slips',
            icon: faFileLines,
        },
        {
            name: 'Announcements',
            href: '/admin/hrm/announcements',
            icon: faBell,
        },
        {
            name: 'HRM Reports',
            href: '/admin/hrm/reports',
            icon: faChartLine,
        },
    ];

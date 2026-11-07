'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Badge } from '@/components/common/Badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/common/Modal';
import { FontAwesomeIcon } from '@/components/icons/FontAwesomeIcon';
import {
    faPlus,
    faDownload,
    faMagnifyingGlass,
    faPenToSquare,
    faTrash,
    faLayerGroup,
    faIdBadge,
    faUsers,
    faCalendar,
    faFileLines,
    faListCheck,
    faChartBar,
    faTags,
    faMoneyBill,
    faCreditCard,
    faDatabase,
    faEnvelope,
    faMessage,
    faStar,
    faShareNodes,
    faImage,
    faVideo,
    faBell,
    faClock,
    faBuilding,
    faPeopleGroup,
    faLocationDot,
    faPercent,
    faShieldHalved,
    faAddressBook,
    faHandshake,
    faUserCheck,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from '@/hooks/use-toast';

// Comprehensive configuration dictionary for every admin section
const sectionData = {
    // Master Sections
    'departments': {
        category: 'MASTER MANAGEMENT',
        title: 'Departments',
        icon: faLayerGroup,
        singular: 'Department',
        description: 'Manage organizational departments, assign department heads and organize your workforce.',
        initialRecords: [
            { id: 'DEP-01', name: 'Engineering & Technology', code: 'ENG', head: 'Devon Vance', members: 42, status: 'Active' },
            { id: 'DEP-02', name: 'Sales & Business Development', code: 'SBD', head: 'Marcus Brody', members: 28, status: 'Active' },
            { id: 'DEP-03', name: 'Human Resources', code: 'HRM', head: 'Sarah Jenkins', members: 12, status: 'Active' },
            { id: 'DEP-04', name: 'Finance & Accounts', code: 'FIN', head: 'Elena Rostova', members: 16, status: 'Active' },
            { id: 'DEP-05', name: 'Operations & Logistics', code: 'OPS', head: 'Rajesh Sharma', members: 34, status: 'Active' },
            { id: 'DEP-06', name: 'Customer Success & Support', code: 'CSS', head: 'Amina Diallo', members: 21, status: 'Active' },
            { id: 'DEP-07', name: 'Marketing & Brand Strategy', code: 'MKT', head: 'Chloe Dupont', members: 15, status: 'Active' },
            { id: 'DEP-08', name: 'Quality Assurance', code: 'QA', head: 'Vikram Mehta', members: 9, status: 'Inactive' },
        ],
    },
    'designations': {
        category: 'MASTER MANAGEMENT',
        title: 'Designations',
        icon: faIdBadge,
        singular: 'Designation',
        description: 'Configure job roles, hierarchy levels, seniority designations, and grade bands.',
        initialRecords: [
            { id: 'DES-01', name: 'Principal Software Engineer', code: 'L5-ENG', head: 'Engineering', members: 8, status: 'Active' },
            { id: 'DES-02', name: 'Senior Account Executive', code: 'L4-SALES', head: 'Sales', members: 14, status: 'Active' },
            { id: 'DES-03', name: 'HR Business Partner', code: 'L4-HR', head: 'Human Resources', members: 4, status: 'Active' },
            { id: 'DES-04', name: 'Financial Controller', code: 'L5-FIN', head: 'Finance', members: 3, status: 'Active' },
            { id: 'DES-05', name: 'Operations Specialist', code: 'L3-OPS', head: 'Operations', members: 18, status: 'Active' },
            { id: 'DES-06', name: 'Associate Product Manager', code: 'L3-PROD', head: 'Product', members: 6, status: 'Active' },
        ],
    },
    'employee-types': {
        category: 'MASTER MANAGEMENT',
        title: 'Employee Types',
        icon: faUsers,
        singular: 'Employee Type',
        description: 'Define full-time, contract, intern, and consultant employment classifications.',
        initialRecords: [
            { id: 'ET-01', name: 'Full-Time Permanent', code: 'FTP', head: 'Standard Benefits', members: 124, status: 'Active' },
            { id: 'ET-02', name: 'Fixed-Term Contract', code: 'FTC', head: 'Hourly/Monthly', members: 28, status: 'Active' },
            { id: 'ET-03', name: 'Graduate Intern', code: 'INT', head: 'Stipend Tier 1', members: 16, status: 'Active' },
            { id: 'ET-04', name: 'Retained Consultant', code: 'CON', head: 'Invoice Based', members: 9, status: 'Active' },
            { id: 'ET-05', name: 'Part-Time Regular', code: 'PTR', head: 'Pro-rata Leaves', members: 5, status: 'Inactive' },
        ],
    },
    'leave-types': {
        category: 'MASTER MANAGEMENT',
        title: 'Leave Types',
        icon: faCalendar,
        singular: 'Leave Type',
        description: 'Configure casual, sick, annual, maternity, and bereavement leave classifications.',
        initialRecords: [
            { id: 'LT-01', name: 'Paid Annual Leave', code: 'AL-18', head: '18 Days / Year', members: 182, status: 'Active' },
            { id: 'LT-02', name: 'Medical / Sick Leave', code: 'SL-12', head: '12 Days / Year', members: 182, status: 'Active' },
            { id: 'LT-03', name: 'Casual Personal Leave', code: 'CL-08', head: '8 Days / Year', members: 182, status: 'Active' },
            { id: 'LT-04', name: 'Maternity Leave', code: 'ML-26W', head: '26 Weeks Paid', members: 6, status: 'Active' },
            { id: 'LT-05', name: 'Paternity Leave', code: 'PL-02W', head: '2 Weeks Paid', members: 14, status: 'Active' },
            { id: 'LT-06', name: 'Bereavement Compassionate', code: 'BCL-05', head: '5 Days Allowed', members: 182, status: 'Active' },
        ],
    },
    'leave-policies': {
        category: 'MASTER MANAGEMENT',
        title: 'Leave Policies',
        icon: faFileLines,
        singular: 'Leave Policy',
        description: 'Establish accrual limits, rollover allowances, encashment, and approval workflows.',
        initialRecords: [
            { id: 'LP-01', name: 'Standard Corporate Policy 2026', code: 'POL-STD', head: 'Full-Time Personnel', members: 124, status: 'Active' },
            { id: 'LP-02', name: 'Contractor Absence Framework', code: 'POL-CTR', head: 'Contract Workers', members: 28, status: 'Active' },
            { id: 'LP-03', name: 'Executive Rollover Guidelines', code: 'POL-EXEC', head: 'Director & VPs', members: 12, status: 'Active' },
            { id: 'LP-04', name: 'Intern Attendance Terms', code: 'POL-INT', head: 'Interns', members: 16, status: 'Active' },
        ],
    },
    'work-types': {
        category: 'MASTER MANAGEMENT',
        title: 'Work Types',
        icon: faListCheck,
        singular: 'Work Type',
        description: 'Configure on-site, hybrid, remote, and field-duty work classifications.',
        initialRecords: [
            { id: 'WT-01', name: 'On-Site Headquarters', code: 'HQ-ON', head: 'Biometric Access', members: 84, status: 'Active' },
            { id: 'WT-02', name: 'Flexible Hybrid 3:2', code: 'HYB-32', head: 'HQ + Home', members: 62, status: 'Active' },
            { id: 'WT-03', name: 'Fully Remote Telecommute', code: 'REM-100', head: 'Global Clock-in', members: 24, status: 'Active' },
            { id: 'WT-04', name: 'Field Sales & Client Duty', code: 'FLD-OPS', head: 'Geo-Tracking Active', members: 12, status: 'Active' },
        ],
    },
    'activity-types': {
        category: 'MASTER MANAGEMENT',
        title: 'Activity Types',
        icon: faChartBar,
        singular: 'Activity Type',
        description: 'Define system activities, logging categories, and operational milestones.',
        initialRecords: [
            { id: 'ACT-01', name: 'Client Demo & Pitch', code: 'SALES-DEMO', head: 'High Priority', members: 48, status: 'Active' },
            { id: 'ACT-02', name: 'Contract Negotiation', code: 'DEAL-NEG', head: 'Deal Milestone', members: 22, status: 'Active' },
            { id: 'ACT-03', name: 'Technical Support Ticket', code: 'SUP-TICK', head: 'SLA Tracked', members: 110, status: 'Active' },
            { id: 'ACT-04', name: 'Field Audit & Review', code: 'AUD-REV', head: 'Quarterly', members: 14, status: 'Active' },
        ],
    },
    'task-status': {
        category: 'MASTER MANAGEMENT',
        title: 'Task Status',
        icon: faListCheck,
        singular: 'Task Status',
        description: 'Configure task progress pipelines, workflow stages, and resolution states.',
        initialRecords: [
            { id: 'TS-01', name: 'Backlog / Queued', code: 'QUEUE', head: 'Phase 1', members: 32, status: 'Active' },
            { id: 'TS-02', name: 'In Progress', code: 'PROGRESS', head: 'Phase 2', members: 45, status: 'Active' },
            { id: 'TS-03', name: 'Internal Review / QA', code: 'REVIEW', head: 'Phase 3', members: 18, status: 'Active' },
            { id: 'TS-04', name: 'Completed & Signed Off', code: 'DONE', head: 'Phase 4', members: 164, status: 'Active' },
            { id: 'TS-05', name: 'Blocked / Needs Input', code: 'BLOCKED', head: 'Escalation', members: 7, status: 'Active' },
        ],
    },
    'subscription-plans': {
        category: 'MASTER MANAGEMENT',
        title: 'Subscription Plans',
        icon: faLayerGroup,
        singular: 'Subscription Plan',
        description: 'Manage enterprise tier quotas, feature gates, seat licenses, and billing cycles.',
        initialRecords: [
            { id: 'SUB-01', name: 'QB Suite Enterprise Platinum', code: 'PLAN-ENT', head: 'Unlimited Seats', members: 120, status: 'Active' },
            { id: 'SUB-02', name: 'QB Suite Professional', code: 'PLAN-PRO', head: '50 Seats Limit', members: 45, status: 'Active' },
            { id: 'SUB-03', name: 'QB Suite Growth Tier', code: 'PLAN-GROWTH', head: '20 Seats Limit', members: 17, status: 'Active' },
        ],
    },
    'expense-categories': {
        category: 'MASTER MANAGEMENT',
        title: 'Expense Categories',
        icon: faTags,
        singular: 'Expense Category',
        description: 'Categorize travel, lodging, utilities, equipment, and client entertainment claims.',
        initialRecords: [
            { id: 'EXP-01', name: 'Corporate Travel & Flights', code: 'CAT-TRV', head: 'Receipt Mandated', members: 54, status: 'Active' },
            { id: 'EXP-02', name: 'Hotel & Accommodation', code: 'CAT-HTL', head: 'Per Diem Capped', members: 38, status: 'Active' },
            { id: 'EXP-03', name: 'Client Meal & Hospitality', code: 'CAT-ENT', head: 'Manager Approval', members: 42, status: 'Active' },
            { id: 'EXP-04', name: 'IT Hardware & Peripherals', code: 'CAT-IT', head: 'Fixed Budget', members: 29, status: 'Active' },
            { id: 'EXP-05', name: 'Software Licenses & SaaS', code: 'CAT-SFT', head: 'Annual Recurring', members: 19, status: 'Active' },
        ],
    },
    'loan-types': {
        category: 'MASTER MANAGEMENT',
        title: 'Loan Types',
        icon: faMoneyBill,
        singular: 'Loan Type',
        description: 'Define employee salary advance, emergency assistance, and equipment loan parameters.',
        initialRecords: [
            { id: 'LN-01', name: 'Emergency Salary Advance', code: 'LOAN-ADV', head: '0% Interest / 3 Mo', members: 12, status: 'Active' },
            { id: 'LN-02', name: 'Home Relocation Assistance', code: 'LOAN-REL', head: '3.5% / 12 Mo', members: 5, status: 'Active' },
            { id: 'LN-03', name: 'Laptop & Hardware Buyout', code: 'LOAN-DEV', head: 'Payroll Deduction', members: 18, status: 'Active' },
        ],
    },
    'payment-methods': {
        category: 'MASTER MANAGEMENT',
        title: 'Payment Methods',
        icon: faCreditCard,
        singular: 'Payment Method',
        description: 'Configure corporate payout gateways, direct NEFT/RTGS rails, and UPI channels.',
        initialRecords: [
            { id: 'PM-01', name: 'Direct NEFT / RTGS Corporate Rail', code: 'RAIL-NEFT', head: 'HDFC Corporate API', members: 168, status: 'Active' },
            { id: 'PM-02', name: 'Instant UPI Payout Gateway', code: 'RAIL-UPI', head: 'RazorpayX Node', members: 45, status: 'Active' },
            { id: 'PM-03', name: 'Corporate VISA Commercial Card', code: 'RAIL-VISA', head: 'ICICI Bank Vault', members: 14, status: 'Active' },
        ],
    },
};

export default function SectionPage() {
    return (
        <React.Suspense fallback={<div className="p-8 text-center text-slate-400">Loading section...</div>}>
            <SectionPageContent />
        </React.Suspense>
    );
}

function SectionPageContent() {
    const params = useParams();
    const raw = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const slug = String(raw || 'section').toLowerCase();

    // Look up section configuration or generate generic fallback
    const config = sectionData[slug] || {
        category: 'ADMINISTRATION',
        title: slug.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' '),
        icon: faLayerGroup,
        singular: slug.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' '),
        description: `Manage and configure ${slug.replaceAll('-', ' ')} records across the QB Suite enterprise system.`,
        initialRecords: [
            { id: 'REC-01', name: 'Standard Configuration', code: 'STD-01', head: 'Default Group', members: 10, status: 'Active' },
            { id: 'REC-02', name: 'Secondary Configuration', code: 'SEC-02', head: 'Enterprise Group', members: 24, status: 'Active' },
        ],
    };

    const [records, setRecords] = React.useState(config.initialRecords);
    const [search, setSearch] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('all');
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [newName, setNewName] = React.useState('');
    const [newCode, setNewCode] = React.useState('');

    // Update records if slug changes
    React.useEffect(() => {
        setRecords(config.initialRecords);
        setSearch('');
        setStatusFilter('all');
    }, [slug]);

    const filteredRecords = React.useMemo(() => {
        return records.filter((r) => {
            const matchesSearch =
                r.name.toLowerCase().includes(search.toLowerCase()) ||
                r.code.toLowerCase().includes(search.toLowerCase()) ||
                r.head.toLowerCase().includes(search.toLowerCase());
            const matchesStatus =
                statusFilter === 'all' || r.status.toLowerCase() === statusFilter.toLowerCase();
            return matchesSearch && matchesStatus;
        });
    }, [records, search, statusFilter]);

    const handleCreate = (e) => {
        e.preventDefault();
        if (!newName.trim()) {
            toast.error('Validation error', { description: 'Please provide a valid title/name.' });
            return;
        }

        const newRecord = {
            id: `REC-${10 + records.length + 1}`,
            name: newName.trim(),
            code: (newCode.trim() || newName.slice(0, 3).toUpperCase()),
            head: 'General Administration',
            members: 0,
            status: 'Active',
        };

        setRecords([newRecord, ...records]);
        setDialogOpen(false);
        setNewName('');
        setNewCode('');
        toast.success(`${config.singular} Added`, {
            description: `"${newRecord.name}" has been registered successfully.`,
        });
    };

    const handleExport = () => {
        toast.info('Export Started', {
            description: `Exporting ${records.length} ${config.title.toLowerCase()} records to CSV format.`,
        });
    };

    const handleDelete = (id, name) => {
        setRecords(records.filter((r) => r.id !== id));
        toast.success('Record Removed', {
            description: `"${name}" has been removed from ${config.title}.`,
        });
    };

    const stats = [
        { label: `Total ${config.title}`, value: records.length.toString(), change: '+2 this mo', changeType: 'increase' },
        { label: 'Active Status', value: records.filter((r) => r.status === 'Active').length.toString(), change: '100% healthy', changeType: 'increase' },
        { label: 'Total Assigned', value: records.reduce((acc, r) => acc + (r.members || 0), 0).toString(), change: 'Workforce', changeType: 'increase' },
        { label: 'System Sync', value: 'Live', change: 'Updated now', changeType: 'increase' },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Global Page Header */}
            <PageHeader
                category={config.category}
                title={config.title}
                icon={config.icon}
                description={config.description}
                primaryAction={
                    <Button
                        onClick={() => setDialogOpen(true)}
                        className="bg-brand hover:bg-brand-dark text-primary-foreground font-semibold text-xs h-9 gap-1.5 shadow-sm px-3.5"
                    >
                        <FontAwesomeIcon icon={faPlus} className="size-3.5" />
                        <span>Add {config.singular}</span>
                    </Button>
                }
                secondaryAction={
                    <Button
                        variant="outline"
                        onClick={handleExport}
                        className="border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs h-9 gap-1.5 shadow-2xs px-3"
                    >
                        <FontAwesomeIcon icon={faDownload} className="size-3.5 text-slate-500" />
                        <span>Export CSV</span>
                    </Button>
                }
                stats={stats}
            />

            {/* Management Controls & Interactive Data Table */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs space-y-4">
                {/* Search & Status Filter Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
                    <div className="relative flex-1 max-w-sm">
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400"
                        />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={`Search ${config.title.toLowerCase()} by name, code...`}
                            className="pl-9 h-9 text-xs bg-slate-50/70 border-slate-200 focus-visible:bg-white focus-visible:ring-brand"
                        />
                    </div>

                    <div className="flex items-center gap-1.5">
                        {['all', 'active', 'inactive'].map((st) => (
                            <button
                                key={st}
                                onClick={() => setStatusFilter(st)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                                    statusFilter === st
                                        ? 'bg-brand/10 text-brand-dark border border-brand/20 shadow-2xs'
                                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                                }`}
                            >
                                {st}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead>
                            <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                <th className="py-3 px-3.5 rounded-l-lg">ID & Code</th>
                                <th className="py-3 px-3.5">{config.singular} Name</th>
                                <th className="py-3 px-3.5">Details / Assignment</th>
                                <th className="py-3 px-3.5">Assigned Members</th>
                                <th className="py-3 px-3.5">Status</th>
                                <th className="py-3 px-3.5 rounded-r-lg text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredRecords.length > 0 ? (
                                filteredRecords.map((r) => (
                                    <tr key={r.id} className="hover:bg-slate-50/70 transition-colors group">
                                        <td className="py-3.5 px-3.5 font-medium text-slate-700">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-900">{r.id}</span>
                                                <span className="text-[10px] text-slate-400 font-mono">{r.code}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-3.5">
                                            <span className="font-semibold text-slate-900">{r.name}</span>
                                        </td>
                                        <td className="py-3.5 px-3.5 text-slate-600">
                                            <span>{r.head}</span>
                                        </td>
                                        <td className="py-3.5 px-3.5">
                                            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                                                {r.members}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-3.5">
                                            <Badge
                                                variant="outline"
                                                className={`text-[10px] font-semibold py-0.5 px-2 rounded-full border ${
                                                    r.status === 'Active'
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                        : 'bg-slate-100 text-slate-600 border-slate-200'
                                                }`}
                                            >
                                                {r.status}
                                            </Badge>
                                        </td>
                                        <td className="py-3.5 px-3.5 text-right">
                                            <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100">
                                                <button
                                                    onClick={() =>
                                                        toast.info(`Editing ${r.name}`, {
                                                            description: 'Configuration drawer is ready for updates.',
                                                        })
                                                    }
                                                    title="Edit configuration"
                                                    className="size-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-brand-dark flex items-center justify-center transition-colors"
                                                >
                                                    <FontAwesomeIcon icon={faPenToSquare} className="size-3" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(r.id, r.name)}
                                                    title="Delete record"
                                                    className="size-7 rounded-lg border border-slate-200 text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 flex items-center justify-center transition-colors"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} className="size-3" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-slate-400">
                                        <p className="text-sm font-medium">No matching records found.</p>
                                        <p className="text-xs mt-1">Try clearing your search query or status filter.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer status summary */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                    <span>
                        Showing <strong className="text-slate-800">{filteredRecords.length}</strong> of{' '}
                        <strong className="text-slate-800">{records.length}</strong> {config.title.toLowerCase()}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                        QB Suite Enterprise Policy Active
                    </span>
                </div>
            </div>

            {/* Create Record Modal Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-base font-bold text-slate-900">
                            Add New {config.singular}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-slate-500">
                            Enter the organizational parameters to configure this new {config.singular.toLowerCase()}.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreate} className="space-y-3.5 py-2">
                        <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1">
                                {config.singular} Title / Name *
                            </label>
                            <Input
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder={`e.g. Operations & Compliance`}
                                className="h-9 text-xs"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1">
                                Identification Code
                            </label>
                            <Input
                                value={newCode}
                                onChange={(e) => setNewCode(e.target.value)}
                                placeholder="e.g. OPS-COMP"
                                className="h-9 text-xs"
                            />
                        </div>

                        <DialogFooter className="pt-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                                className="h-8 text-xs font-medium"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="h-8 text-xs font-semibold bg-brand hover:bg-brand-dark text-primary-foreground"
                            >
                                Save {config.singular}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

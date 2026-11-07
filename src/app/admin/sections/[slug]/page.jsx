'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SegmentedTabs } from '@/components/ui/segmented-tabs';
import { KpiGrid } from '@/components/common/KpiCard';
import { FormDrawer } from '@/components/common/drawers/FormDrawer';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import {
    DataTable,
    DataTableColumnHeader,
    DataTableRowActions,
} from '@/components/data-table';
import { FontAwesomeIcon } from '@/components/icons/FontAwesomeIcon';
import {
    faPlus,
    faDownload,
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
    faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from '@/hooks/use-toast';

// Comprehensive configuration dictionary for every admin section
const sectionData = {
    // Master Sections
    'departments': {
        category: 'MASTER MANAGEMENT',
        title: 'Departments',
        icon: faBuilding,
        singular: 'Department',
        description: 'Manage departments, organize teams and configure organizational structure.',
        initialRecords: [
            { id: 'DEP-01', name: 'Engineering & Technology', code: 'ENG', head: 'Devon Vance', members: 42, status: 'Active', createdOn: '14 Jan 2026', description: 'Core product engineering, infrastructure and cloud platform operations.' },
            { id: 'DEP-02', name: 'Sales & Business Development', code: 'SBD', head: 'Marcus Brody', members: 28, status: 'Active', createdOn: '18 Jan 2026', description: 'Enterprise sales acquisition, renewals, and revenue generation.' },
            { id: 'DEP-03', name: 'Human Resources', code: 'HRM', head: 'Sarah Jenkins', members: 12, status: 'Active', createdOn: '22 Jan 2026', description: 'Talent recruitment, employee relations, payroll, and benefits.' },
            { id: 'DEP-04', name: 'Finance & Accounts', code: 'FIN', head: 'Elena Rostova', members: 16, status: 'Active', createdOn: '01 Feb 2026', description: 'Financial forecasting, compliance, statutory tax, and audits.' },
            { id: 'DEP-05', name: 'Operations & Logistics', code: 'OPS', head: 'Rajesh Sharma', members: 34, status: 'Active', createdOn: '05 Feb 2026', description: 'Facility management, supply chains, equipment, and field deployment.' },
            { id: 'DEP-06', name: 'Customer Success & Support', code: 'CSS', head: 'Amina Diallo', members: 21, status: 'Active', createdOn: '12 Feb 2026', description: 'Customer onboarding, enterprise technical support, and account health.' },
            { id: 'DEP-07', name: 'Marketing & Brand Strategy', code: 'MKT', head: 'Chloe Dupont', members: 15, status: 'Active', createdOn: '19 Feb 2026', description: 'Brand advertising, content generation, PR, and lead funnels.' },
            { id: 'DEP-08', name: 'Quality Assurance & Security', code: 'QA', head: 'Vikram Mehta', members: 9, status: 'Inactive', createdOn: '02 Mar 2026', description: 'Quality assurance test cycles, security audits, and risk compliance.' },
        ],
    },
    'designations': {
        category: 'MASTER MANAGEMENT',
        title: 'Designations',
        icon: faIdBadge,
        singular: 'Designation',
        description: 'Configure job roles, hierarchy levels, seniority designations, and grade bands.',
        initialRecords: [
            { id: 'DES-01', name: 'Principal Software Engineer', code: 'L5-ENG', head: 'Engineering', members: 8, status: 'Active', createdOn: '10 Jan 2026', description: 'Technical architecture and core platform engineering.' },
            { id: 'DES-02', name: 'Senior Account Executive', code: 'L4-SALES', head: 'Sales', members: 14, status: 'Active', createdOn: '12 Jan 2026', description: 'Mid-market and enterprise deal closing.' },
            { id: 'DES-03', name: 'HR Business Partner', code: 'L4-HR', head: 'Human Resources', members: 4, status: 'Active', createdOn: '15 Jan 2026', description: 'Strategic workforce planning and employee development.' },
            { id: 'DES-04', name: 'Financial Controller', code: 'L5-FIN', head: 'Finance', members: 3, status: 'Active', createdOn: '20 Jan 2026', description: 'Corporate treasury and management reporting.' },
            { id: 'DES-05', name: 'Operations Specialist', code: 'L3-OPS', head: 'Operations', members: 18, status: 'Active', createdOn: '25 Jan 2026', description: 'Daily logistics and fleet operations support.' },
            { id: 'DES-06', name: 'Associate Product Manager', code: 'L3-PROD', head: 'Product', members: 6, status: 'Active', createdOn: '01 Feb 2026', description: 'User stories, sprint backlogs, and release execution.' },
        ],
    },
    'employee-types': {
        category: 'MASTER MANAGEMENT',
        title: 'Employee Types',
        icon: faUsers,
        singular: 'Employee Type',
        description: 'Define full-time, contract, intern, and consultant employment classifications.',
        initialRecords: [
            { id: 'ET-01', name: 'Full-Time Permanent', code: 'FTP', head: 'Standard Benefits', members: 124, status: 'Active', createdOn: '05 Jan 2026', description: 'Regular personnel entitled to full benefits and paid leave.' },
            { id: 'ET-02', name: 'Fixed-Term Contract', code: 'FTC', head: 'Hourly/Monthly', members: 28, status: 'Active', createdOn: '08 Jan 2026', description: 'Specified tenure agreements with monthly retainer compensation.' },
            { id: 'ET-03', name: 'Graduate Intern', code: 'INT', head: 'Stipend Tier 1', members: 16, status: 'Active', createdOn: '15 Jan 2026', description: 'Six-month rotation with structured mentorship program.' },
            { id: 'ET-04', name: 'Retained Consultant', code: 'CON', head: 'Invoice Based', members: 9, status: 'Active', createdOn: '20 Jan 2026', description: 'Advisory and specialized professional service providers.' },
            { id: 'ET-05', name: 'Part-Time Regular', code: 'PTR', head: 'Pro-rata Leaves', members: 5, status: 'Inactive', createdOn: '01 Feb 2026', description: 'Scheduled shifts under 30 hours per week.' },
        ],
    },
    'leave-types': {
        category: 'MASTER MANAGEMENT',
        title: 'Leave Types',
        icon: faCalendar,
        singular: 'Leave Type',
        description: 'Configure casual, sick, annual, maternity, and bereavement leave classifications.',
        initialRecords: [
            { id: 'LT-01', name: 'Paid Annual Leave', code: 'AL-18', head: '18 Days / Year', members: 182, status: 'Active', createdOn: '01 Jan 2026', description: 'Statutory vacation time accrued monthly.' },
            { id: 'LT-02', name: 'Medical / Sick Leave', code: 'SL-12', head: '12 Days / Year', members: 182, status: 'Active', createdOn: '01 Jan 2026', description: 'Health convalescence with doctor certificate for >2 days.' },
            { id: 'LT-03', name: 'Casual Personal Leave', code: 'CL-08', head: '8 Days / Year', members: 182, status: 'Active', createdOn: '01 Jan 2026', description: 'Short unexpected personal commitments.' },
            { id: 'LT-04', name: 'Maternity Leave', code: 'ML-26W', head: '26 Weeks Paid', members: 6, status: 'Active', createdOn: '01 Jan 2026', description: 'Statutory paid maternity benefit for new mothers.' },
            { id: 'LT-05', name: 'Paternity Leave', code: 'PL-02W', head: '2 Weeks Paid', members: 14, status: 'Active', createdOn: '01 Jan 2026', description: 'Parental leave support for secondary caregivers.' },
        ],
    },
    'leave-policies': {
        category: 'MASTER MANAGEMENT',
        title: 'Leave Policies',
        icon: faFileLines,
        singular: 'Leave Policy',
        description: 'Establish accrual limits, rollover allowances, encashment, and approval workflows.',
        initialRecords: [
            { id: 'LP-01', name: 'Standard Corporate Policy 2026', code: 'POL-STD', head: 'Full-Time Personnel', members: 124, status: 'Active', createdOn: '01 Jan 2026', description: 'Annual policy governing vacation rollover and approval matrices.' },
            { id: 'LP-02', name: 'Contractor Absence Framework', code: 'POL-CTR', head: 'Contract Workers', members: 28, status: 'Active', createdOn: '05 Jan 2026', description: 'Guidelines for contractor unpaid downtime and billing adjustments.' },
            { id: 'LP-03', name: 'Executive Rollover Guidelines', code: 'POL-EXEC', head: 'Director & VPs', members: 12, status: 'Active', createdOn: '10 Jan 2026', description: 'Executive level special leave encashment limits.' },
        ],
    },
    'work-types': {
        category: 'MASTER MANAGEMENT',
        title: 'Work Types',
        icon: faListCheck,
        singular: 'Work Type',
        description: 'Configure on-site, hybrid, remote, and field-duty work classifications.',
        initialRecords: [
            { id: 'WT-01', name: 'On-Site Headquarters', code: 'HQ-ON', head: 'Biometric Access', members: 84, status: 'Active', createdOn: '01 Jan 2026', description: 'Standard workplace presence with automated access gates.' },
            { id: 'WT-02', name: 'Flexible Hybrid 3:2', code: 'HYB-32', head: 'HQ + Home', members: 62, status: 'Active', createdOn: '05 Jan 2026', description: 'Three days in office, two days telecommuting per week.' },
            { id: 'WT-03', name: 'Fully Remote Telecommute', code: 'REM-100', head: 'Global Clock-in', members: 24, status: 'Active', createdOn: '10 Jan 2026', description: '100% remote asynchronous collaboration.' },
        ],
    },
    'activity-types': {
        category: 'MASTER MANAGEMENT',
        title: 'Activity Types',
        icon: faChartBar,
        singular: 'Activity Type',
        description: 'Define system activities, logging categories, and operational milestones.',
        initialRecords: [
            { id: 'ACT-01', name: 'Client Demo & Pitch', code: 'SALES-DEMO', head: 'High Priority', members: 48, status: 'Active', createdOn: '01 Jan 2026', description: 'Interactive product walkthrough with enterprise prospects.' },
            { id: 'ACT-02', name: 'Contract Negotiation', code: 'DEAL-NEG', head: 'Deal Milestone', members: 22, status: 'Active', createdOn: '05 Jan 2026', description: 'Commercial terms alignment with corporate legal counsel.' },
        ],
    },
    'task-status': {
        category: 'MASTER MANAGEMENT',
        title: 'Task Status',
        icon: faListCheck,
        singular: 'Task Status',
        description: 'Configure task progress pipelines, workflow stages, and resolution states.',
        initialRecords: [
            { id: 'TS-01', name: 'Backlog / Queued', code: 'QUEUE', head: 'Phase 1', members: 32, status: 'Active', createdOn: '01 Jan 2026', description: 'Triaged tickets awaiting sprint commitment.' },
            { id: 'TS-02', name: 'In Progress', code: 'PROGRESS', head: 'Phase 2', members: 45, status: 'Active', createdOn: '01 Jan 2026', description: 'Actively in engineering development or task execution.' },
            { id: 'TS-03', name: 'Completed & Signed Off', code: 'DONE', head: 'Phase 4', members: 164, status: 'Active', createdOn: '01 Jan 2026', description: 'Verified and delivered tickets.' },
        ],
    },
    'subscription-plans': {
        category: 'MASTER MANAGEMENT',
        title: 'Subscription Plans',
        icon: faLayerGroup,
        singular: 'Subscription Plan',
        description: 'Manage enterprise tier quotas, feature gates, seat licenses, and billing cycles.',
        initialRecords: [
            { id: 'SUB-01', name: 'QB Suite Enterprise Platinum', code: 'PLAN-ENT', head: 'Unlimited Seats', members: 120, status: 'Active', createdOn: '01 Jan 2026', description: 'Full access to all CRM, HRM, Production and AI modules.' },
            { id: 'SUB-02', name: 'QB Suite Professional', code: 'PLAN-PRO', head: '50 Seats Limit', members: 45, status: 'Active', createdOn: '01 Jan 2026', description: 'Essential core features for mid-sized organizations.' },
        ],
    },
    'expense-categories': {
        category: 'MASTER MANAGEMENT',
        title: 'Expense Categories',
        icon: faTags,
        singular: 'Expense Category',
        description: 'Categorize travel, lodging, utilities, equipment, and client entertainment claims.',
        initialRecords: [
            { id: 'EXP-01', name: 'Corporate Travel & Flights', code: 'CAT-TRV', head: 'Receipt Mandated', members: 54, status: 'Active', createdOn: '01 Jan 2026', description: 'Intercity and international travel expenses.' },
            { id: 'EXP-02', name: 'Client Meal & Hospitality', code: 'CAT-ENT', head: 'Manager Approval', members: 42, status: 'Active', createdOn: '01 Jan 2026', description: 'Business lunches and partner hospitality.' },
        ],
    },
    'loan-types': {
        category: 'MASTER MANAGEMENT',
        title: 'Loan Types',
        icon: faMoneyBill,
        singular: 'Loan Type',
        description: 'Define employee salary advance, emergency assistance, and equipment loan parameters.',
        initialRecords: [
            { id: 'LN-01', name: 'Emergency Salary Advance', code: 'LOAN-ADV', head: '0% Interest / 3 Mo', members: 12, status: 'Active', createdOn: '01 Jan 2026', description: 'Short-term financial aid deducted over 3 paychecks.' },
        ],
    },
    'payment-methods': {
        category: 'MASTER MANAGEMENT',
        title: 'Payment Methods',
        icon: faCreditCard,
        singular: 'Payment Method',
        description: 'Configure corporate payout gateways, direct NEFT/RTGS rails, and UPI channels.',
        initialRecords: [
            { id: 'PM-01', name: 'Direct NEFT / RTGS Corporate Rail', code: 'RAIL-NEFT', head: 'HDFC Corporate API', members: 168, status: 'Active', createdOn: '01 Jan 2026', description: 'Automated batch bank disbursements.' },
            { id: 'PM-02', name: 'Instant UPI Payout Gateway', code: 'RAIL-UPI', head: 'RazorpayX Node', members: 45, status: 'Active', createdOn: '01 Jan 2026', description: '24/7 real-time settlement rail.' },
        ],
    },
};

export default function SectionPage() {
    return (
        <React.Suspense fallback={<div className="p-8 text-center text-slate-400">Loading workspace...</div>}>
            <SectionPageContent />
        </React.Suspense>
    );
}

function SectionPageContent() {
    const params = useParams();
    const raw = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const slug = String(raw || 'departments').toLowerCase();

    // Look up section configuration
    const config = sectionData[slug] || {
        category: 'MASTER MANAGEMENT',
        title: slug.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' '),
        icon: faBuilding,
        singular: slug.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' '),
        description: `Manage organizational ${slug.replaceAll('-', ' ')} records, assign heads, and track team members.`,
        initialRecords: [
            { id: 'REC-01', name: 'Standard Operations', code: 'OPS-01', head: 'Marcus Brody', members: 24, status: 'Active', createdOn: '10 Jan 2026', description: 'Primary operations unit.' },
            { id: 'REC-02', name: 'Secondary Unit', code: 'SEC-02', head: 'Sarah Jenkins', members: 16, status: 'Active', createdOn: '15 Jan 2026', description: 'Regional support team.' },
        ],
    };

    const [records, setRecords] = React.useState(config.initialRecords);
    const [selectedTab, setSelectedTab] = React.useState('all');

    // Drawer state
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [editingRecord, setEditingRecord] = React.useState(null);

    // View details state
    const [viewingRecord, setViewingRecord] = React.useState(null);
    const [viewDrawerOpen, setViewDrawerOpen] = React.useState(false);

    // Delete confirmation state
    const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
    const [recordToDelete, setRecordToDelete] = React.useState(null);

    // Form fields
    const [formName, setFormName] = React.useState('');
    const [formCode, setFormCode] = React.useState('');
    const [formHead, setFormHead] = React.useState('');
    const [formDesc, setFormDesc] = React.useState('');
    const [formStatus, setFormStatus] = React.useState('Active');

    // Sync records on slug change
    React.useEffect(() => {
        setRecords(config.initialRecords);
        setSelectedTab('all');
    }, [slug]);

    // Segmented tab counts
    const allCount = records.length;
    const activeCount = records.filter((r) => r.status === 'Active').length;
    const inactiveCount = records.filter((r) => r.status === 'Inactive').length;
    const totalStaff = records.reduce((sum, r) => sum + (r.members || 0), 0);

    const tabs = [
        { label: 'All', value: 'all', count: allCount },
        { label: 'Active', value: 'active', count: activeCount },
        { label: 'Inactive', value: 'inactive', count: inactiveCount },
        { label: 'Archived', value: 'archived', count: 0 },
    ];

    // Filtered by Segmented Tab
    const tabFilteredRecords = React.useMemo(() => {
        if (selectedTab === 'active') return records.filter((r) => r.status === 'Active');
        if (selectedTab === 'inactive') return records.filter((r) => r.status === 'Inactive');
        if (selectedTab === 'archived') return [];
        return records;
    }, [records, selectedTab]);

    // Open Drawer for Create
    const handleOpenCreate = () => {
        setEditingRecord(null);
        setFormName('');
        setFormCode('');
        setFormHead('');
        setFormDesc('');
        setFormStatus('Active');
        setDrawerOpen(true);
    };

    // Open Drawer for Edit
    const handleOpenEdit = React.useCallback((record) => {
        setEditingRecord(record);
        setFormName(record.name);
        setFormCode(record.code);
        setFormHead(record.head);
        setFormDesc(record.description || '');
        setFormStatus(record.status || 'Active');
        setDrawerOpen(true);
    }, []);

    // Open View Details Drawer
    const handleOpenView = React.useCallback((record) => {
        setViewingRecord(record);
        setViewDrawerOpen(true);
    }, []);

    // Open Delete Confirm
    const handleOpenDelete = React.useCallback((record) => {
        setRecordToDelete(record);
        setConfirmDeleteOpen(true);
    }, []);

    // Confirm Delete
    const handleConfirmDelete = () => {
        if (!recordToDelete) return;
        setRecords((prev) => prev.filter((r) => r.id !== recordToDelete.id));
        toast.success(`${config.singular} Deleted`, {
            description: `"${recordToDelete.name}" has been removed from the system.`,
        });
        setConfirmDeleteOpen(false);
        setRecordToDelete(null);
    };

    // Save Form (Create or Edit)
    const handleSaveForm = (e) => {
        e.preventDefault();
        if (!formName.trim()) {
            toast.error('Validation error', { description: 'Please provide a valid name.' });
            return;
        }

        if (editingRecord) {
            setRecords((prev) =>
                prev.map((r) =>
                    r.id === editingRecord.id
                        ? {
                              ...r,
                              name: formName.trim(),
                              code: formCode.trim() || r.code,
                              head: formHead.trim() || r.head,
                              description: formDesc.trim(),
                              status: formStatus,
                          }
                        : r
                )
            );
            toast.success(`${config.singular} Updated`, {
                description: `"${formName.trim()}" has been updated successfully.`,
            });
        } else {
            const newRecord = {
                id: `${config.singular.slice(0, 3).toUpperCase()}-${String(records.length + 1).padStart(2, '0')}`,
                name: formName.trim(),
                code: formCode.trim() || formName.slice(0, 3).toUpperCase(),
                head: formHead.trim() || 'Unassigned',
                members: 0,
                status: formStatus,
                createdOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                description: formDesc.trim(),
            };
            setRecords([newRecord, ...records]);
            toast.success(`${config.singular} Created`, {
                description: `"${newRecord.name}" has been registered successfully.`,
            });
        }

        setDrawerOpen(false);
    };

    const handleExport = () => {
        toast.info('Export Started', {
            description: `Exporting ${records.length} ${config.title.toLowerCase()} records to CSV format.`,
        });
    };

    // TanStack Table Column Definitions
    const columns = React.useMemo(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected()}
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all rows"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label={`Select row ${row.id}`}
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: 'name',
                header: ({ column }) => <DataTableColumnHeader column={column} title={`${config.singular} Name`} />,
                cell: ({ row }) => (
                    <div className="flex items-center gap-3">
                        <div className="size-9 rounded-xl bg-brand/10 text-brand-dark flex items-center justify-center font-bold text-xs shrink-0 border border-brand/20">
                            <FontAwesomeIcon icon={config.icon} className="size-4 text-brand" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-slate-900 leading-tight truncate">
                                {row.original.name}
                            </span>
                            <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                {row.original.description || row.original.head}
                            </span>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: 'code',
                header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
                cell: ({ row }) => (
                    <Badge variant="outline" className="font-mono text-[11px] font-semibold bg-slate-50 text-slate-700 border-slate-200">
                        {row.original.code}
                    </Badge>
                ),
            },
            {
                accessorKey: 'head',
                header: ({ column }) => <DataTableColumnHeader column={column} title="Head of Dept" />,
                cell: ({ row }) => {
                    const initials = row.original.head
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2);
                    return (
                        <div className="flex items-center gap-2">
                            <div className="size-6.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center border border-emerald-200">
                                {initials}
                            </div>
                            <span className="text-xs font-medium text-slate-700">{row.original.head}</span>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'members',
                header: ({ column }) => <DataTableColumnHeader column={column} title="Employees" />,
                cell: ({ row }) => (
                    <span className="inline-flex items-center gap-1.5 font-bold text-slate-700 bg-emerald-50/80 text-emerald-800 border border-emerald-200/80 px-2.5 py-0.5 rounded-full text-xs">
                        <FontAwesomeIcon icon={faUsers} className="size-3 text-emerald-600" />
                        <span>{row.original.members} Members</span>
                    </span>
                ),
            },
            {
                accessorKey: 'status',
                header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
                cell: ({ row }) => {
                    const isActive = row.original.status === 'Active';
                    return (
                        <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                                isActive
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                        >
                            <span className={`size-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                            {row.original.status}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'createdOn',
                header: ({ column }) => <DataTableColumnHeader column={column} title="Created On" />,
                cell: ({ row }) => (
                    <span className="text-xs text-slate-500 font-medium">
                        {row.original.createdOn || '12 Jan 2026'}
                    </span>
                ),
            },
            {
                id: 'actions',
                header: () => <div className="text-right">Actions</div>,
                cell: ({ row }) => (
                    <div className="flex items-center justify-end">
                        <DataTableRowActions
                            row={row}
                            onView={handleOpenView}
                            onEdit={handleOpenEdit}
                            onDelete={handleOpenDelete}
                        />
                    </div>
                ),
            },
        ],
        [config, handleOpenView, handleOpenEdit, handleOpenDelete]
    );

    // KPI Cards configuration
    const kpiCards = [
        {
            title: `Total ${config.title}`,
            value: allCount.toString(),
            change: '+2 this month',
            changeType: 'positive',
            icon: config.icon,
            iconBg: 'bg-emerald-50 border-emerald-200',
            iconColor: 'text-brand-dark',
            description: 'Registered departments in system',
        },
        {
            title: `Active ${config.title}`,
            value: activeCount.toString(),
            change: `${allCount > 0 ? Math.round((activeCount / allCount) * 100) : 100}% Operational`,
            changeType: 'positive',
            icon: faCheck,
            iconBg: 'bg-emerald-50 border-emerald-200',
            iconColor: 'text-emerald-600',
            description: 'Active functional units',
        },
        {
            title: `Inactive ${config.title}`,
            value: inactiveCount.toString(),
            change: inactiveCount > 0 ? 'Review pending' : 'Zero inactive',
            changeType: inactiveCount > 0 ? 'negative' : 'neutral',
            icon: faClock,
            iconBg: 'bg-amber-50 border-amber-200',
            iconColor: 'text-amber-600',
            description: 'Paused or archived units',
        },
        {
            title: 'Total Employees',
            value: totalStaff.toString(),
            change: '100% Assigned',
            changeType: 'positive',
            icon: faUsers,
            iconBg: 'bg-emerald-50 border-emerald-200',
            iconColor: 'text-brand',
            description: 'Active workforce headcount',
        },
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
                        onClick={handleOpenCreate}
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
            />

            {/* KPI Summary Cards */}
            <KpiGrid cards={kpiCards} />

            {/* Segmented Switch (Pill-style filter) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <SegmentedTabs
                    tabs={tabs}
                    value={selectedTab}
                    onChange={setSelectedTab}
                    ariaLabel={`${config.title} status filter`}
                />
            </div>

            {/* Standardized TanStack Data Table */}
            <DataTable
                columns={columns}
                data={tabFilteredRecords}
                searchKey="name"
                searchPlaceholder={`Search ${config.title.toLowerCase()} by name, code...`}
                enableRowSelection={true}
                emptyState={`No ${config.title.toLowerCase()} found for "${selectedTab}".`}
            />

            {/* Right-Side Form Drawer for Add / Edit */}
            <FormDrawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                size="simple"
                title={editingRecord ? `Edit ${config.singular}` : `Add New ${config.singular}`}
                description="Configure organizational parameters, assign leadership, and define operational scope."
                onSubmit={handleSaveForm}
                submitLabel={editingRecord ? 'Save Changes' : `Create ${config.singular}`}
            >
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="dept-name" className="text-xs font-semibold text-slate-700">
                            {config.singular} Name *
                        </Label>
                        <Input
                            id="dept-name"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="e.g. Engineering & Technology"
                            className="h-9 text-xs"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="dept-code" className="text-xs font-semibold text-slate-700">
                            Department Code
                        </Label>
                        <Input
                            id="dept-code"
                            value={formCode}
                            onChange={(e) => setFormCode(e.target.value)}
                            placeholder="e.g. ENG"
                            className="h-9 text-xs uppercase"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="dept-head" className="text-xs font-semibold text-slate-700">
                            Head of Department
                        </Label>
                        <Input
                            id="dept-head"
                            value={formHead}
                            onChange={(e) => setFormHead(e.target.value)}
                            placeholder="e.g. Devon Vance"
                            className="h-9 text-xs"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="dept-status" className="text-xs font-semibold text-slate-700">
                            Status
                        </Label>
                        <Select value={formStatus} onValueChange={setFormStatus}>
                            <SelectTrigger id="dept-status" className="h-9 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="dept-desc" className="text-xs font-semibold text-slate-700">
                            Description & Scope
                        </Label>
                        <Textarea
                            id="dept-desc"
                            value={formDesc}
                            onChange={(e) => setFormDesc(e.target.value)}
                            placeholder="Briefly describe the responsibilities and workforce scope of this department..."
                            rows={3}
                            className="text-xs resize-none"
                        />
                    </div>
                </div>
            </FormDrawer>

            {/* Right-Side View Details Drawer */}
            <FormDrawer
                open={viewDrawerOpen}
                onOpenChange={setViewDrawerOpen}
                size="simple"
                title={viewingRecord?.name || 'Department Details'}
                description={`Reference ID: ${viewingRecord?.id || ''}`}
                showFooter={false}
            >
                {viewingRecord && (
                    <div className="space-y-5">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500 font-medium">Status</span>
                                <Badge
                                    variant="outline"
                                    className={`text-[10px] font-semibold py-0.5 px-2 rounded-full border ${
                                        viewingRecord.status === 'Active'
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                            : 'bg-slate-100 text-slate-600 border-slate-200'
                                    }`}
                                >
                                    {viewingRecord.status}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500 font-medium">Department Code</span>
                                <span className="font-mono text-xs font-semibold text-slate-800">{viewingRecord.code}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500 font-medium">Head of Department</span>
                                <span className="text-xs font-semibold text-slate-800">{viewingRecord.head}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500 font-medium">Assigned Employees</span>
                                <span className="text-xs font-bold text-emerald-700">{viewingRecord.members} Personnel</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500 font-medium">Established Date</span>
                                <span className="text-xs text-slate-700">{viewingRecord.createdOn || '12 Jan 2026'}</span>
                            </div>
                        </div>

                        {viewingRecord.description && (
                            <div className="space-y-1.5">
                                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                                    Operational Description
                                </h4>
                                <p className="text-xs text-slate-600 leading-relaxed p-3 bg-white rounded-lg border border-slate-200">
                                    {viewingRecord.description}
                                </p>
                            </div>
                        )}

                        <div className="pt-2 flex gap-2">
                            <Button
                                onClick={() => {
                                    setViewDrawerOpen(false);
                                    handleOpenEdit(viewingRecord);
                                }}
                                className="flex-1 bg-brand hover:bg-brand-dark text-primary-foreground font-semibold text-xs h-9"
                            >
                                Edit Department
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setViewDrawerOpen(false)}
                                className="flex-1 text-xs h-9"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </FormDrawer>

            {/* Confirm Delete Alert Dialog */}
            <ConfirmDialog
                open={confirmDeleteOpen}
                onOpenChange={setConfirmDeleteOpen}
                title={`Delete ${config.singular}?`}
                description={`Are you sure you want to delete "${recordToDelete?.name}"? Team members assigned to this department will need to be reallocated.`}
                confirmLabel="Yes, Delete"
                cancelLabel="Cancel"
                variant="destructive"
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

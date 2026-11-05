# Shared UI migration

Audit: existing CRM and HRM screens use Base UI primitives in components/ui, composed UI in components/shared, and a reusable dashboard KpiCard. CRM pages repeat table/search markup; there are no Production or Customer admin screens or API clients. Existing data is local mock data. Geist and scattered teal/slate utility colors are used. Remix icons are already used; lucide-react is an unused dependency.

Plan: consolidate implementations first, update all imports, convert frontend TS/TSX to JS/JSX without changing handlers, centralize tokens and shell, move CRM business screens under modules/crm/components, add honest empty-state module entry points for Production and Customer, then lint/build and check imports. Existing HRM routes are preserved without creating an HRM app folder. Backend and sibling mobile apps are out of scope.

Mapping:

- components/ui/button → components/common/Button
- components/ui/input → components/common/Input
- components/ui/textarea → components/common/Textarea
- components/ui/select → components/common/Select
- components/ui/dropdown-menu → components/common/Dropdown
- components/ui/separator → components/common/Separator
- components/ui/table → components/common/Table
- components/ui/badge → components/common/Badge
- components/ui/dialog → components/common/Modal
- components/ui/avatar → components/common/Avatar
- components/ui/command → components/common/Command
- components/ui/calendar → components/common/Calendar
- components/ui/tooltip → components/common/Tooltip
- components/ui/sonner → components/common/Toast
- components/ui/label → components/common/Label
- components/ui/sheet → components/common/Drawer
- components/ui/popover → components/common/Popover
- components/ui/input-group → components/common/InputGroup
- components/ui/card → components/common/Card
- components/ui/tabs → components/common/Tabs
- components/shared/ConfirmDialog → components/common/ConfirmDialog
- components/shared/DataTable → components/common/DataTable
- components/shared/EmptyState → components/common/EmptyState
- components/shared/PageHeader → components/common/PageHeader
- components/shared/StatusBadge → components/common/StatusBadge
- components/dashboard/KpiCard → components/common/StatCard
- components/layout/TopNav → components/layout/Header
- components/layout/Breadcrumbs → components/layout/Breadcrumb

CRM route files → modules/crm/components/*Page.jsx (route wrappers preserve URLs). Module hooks/services/utils folders are reserved for future business logic; do not add local copies of shared UI. Production/Customer use the same common DataTable, Button, Input, Modal, Badge and global shell. No backend endpoints are invented.

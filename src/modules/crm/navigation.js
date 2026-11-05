import { RiBarChartBoxLine, RiContactsBookLine, RiDashboard2Line, RiMegaphoneLine, RiMetaLine, RiUserSearchLine, RiWhatsappLine } from '@remixicon/react';
import { mockCrmKpiData } from '@/modules/crm/services/mock-data';
export const navigation = [
        {
            name: 'CRM Dashboard',
            href: '/admin/crm/dashboard',
            icon: RiDashboard2Line,
            matchExact: true,
        },
        {
            name: 'Leads',
            href: '/admin/crm/leads',
            icon: RiUserSearchLine,
            badge: mockCrmKpiData.leadsCount.toString(),
        },
        {
            name: 'Customers',
            href: '/admin/crm/customers',
            icon: RiContactsBookLine,
        },
        {
            name: 'Campaigns',
            href: '/admin/crm/campaigns',
            icon: RiMegaphoneLine,
        },
        {
            name: 'WhatsApp',
            href: '/admin/crm/whatsapp',
            icon: RiWhatsappLine,
            badge: 'Live',
            badgeVariant: 'green',
        },
        {
            name: 'Meta Integration',
            href: '/admin/crm/meta-integration',
            icon: RiMetaLine,
        },
        {
            name: 'CRM Reports',
            href: '/admin/crm/reports',
            icon: RiBarChartBoxLine,
        },
    ];

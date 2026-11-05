import { faBullhorn, faChartLine, faGauge, faUserGroup, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faMeta, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { mockCrmKpiData } from '@/modules/crm/services/mock-data';
export const navigation = [
        {
            name: 'CRM Dashboard',
            href: '/admin/crm/dashboard',
            icon: faGauge,
            matchExact: true,
        },
        {
            name: 'Leads',
            href: '/admin/crm/leads',
            icon: faUsers,
            badge: mockCrmKpiData.leadsCount.toString(),
        },
        {
            name: 'Customers',
            href: '/admin/crm/customers',
            icon: faUserGroup,
        },
        {
            name: 'Campaigns',
            href: '/admin/crm/campaigns',
            icon: faBullhorn,
        },
        {
            name: 'WhatsApp',
            href: '/admin/crm/whatsapp',
            icon: faWhatsapp,
            badge: 'Live',
            badgeVariant: 'green',
        },
        {
            name: 'Meta Integration',
            href: '/admin/crm/meta-integration',
            icon: faMeta,
        },
        {
            name: 'CRM Reports',
            href: '/admin/crm/reports',
            icon: faChartLine,
        },
    ];

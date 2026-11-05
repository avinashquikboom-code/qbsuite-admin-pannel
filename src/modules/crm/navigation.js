import { usePathname } from 'next/navigation';
import { RiDashboardLine, RiBriefcaseLine, RiBuilding4Line, RiSettings4Line, RiDashboard2Line, RiUserSearchLine, RiContactsBookLine, RiMegaphoneLine, RiWhatsappLine, RiMetaLine, RiBarChartBoxLine, RiTeamLine, RiCalendarCheckLine, RiCupLine, RiTimeLine, RiMoneyDollarCircleLine, RiCalendarCloseLine, RiBankCardLine, RiFileTextLine, RiNotificationBadgeLine, RiPieChartLine, RiArrowDownSLine, RiArrowRightSLine, RiShieldCheckLine, } from '@remixicon/react';
import { mockKpiData, mockCrmKpiData } from '@/lib/mock-data';
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
            badgeVariant: 'teal',
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

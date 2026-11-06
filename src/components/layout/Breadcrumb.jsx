"use client";
import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Breadcrumb as Root, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
const names = { hrm: 'HRM', crm: 'CRM', 'salary-slips': 'Salary Slips', 'meta-integration': 'Meta Integration' };
export function Breadcrumb() {
  const segments = usePathname().split('/').filter(Boolean);
  return <Root className="min-w-0"><BreadcrumbList className="flex-wrap text-xs">
    <BreadcrumbItem><BreadcrumbLink render={<Link href="/admin/dashboard" />}>QB Suite</BreadcrumbLink></BreadcrumbItem>
    {segments.map((segment, index) => <Fragment key={index}><BreadcrumbSeparator /><BreadcrumbItem>
      {index === segments.length - 1 ? <BreadcrumbPage>{names[segment] || segment.replaceAll('-', ' ')}</BreadcrumbPage> :
        <BreadcrumbLink render={<Link href={'/' + segments.slice(0, index + 1).join('/')} />}>{names[segment] || segment}</BreadcrumbLink>}
    </BreadcrumbItem></Fragment>)}
  </BreadcrumbList></Root>;
}

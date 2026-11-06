'use client';

import { PageHeader } from '@/components/common/PageHeader';
import { useParams } from 'next/navigation';

export default function SectionPage() {
    const params = useParams();
    const raw = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const title = String(raw || 'Section')
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');

    return (
        <PageHeader
            title={title}
            description="This section is listed in the admin sidebar."
        />
    );
}

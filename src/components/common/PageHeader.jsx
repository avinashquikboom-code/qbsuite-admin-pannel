import * as React from 'react';
import { Badge } from '@/components/common/Badge';
export function PageHeader({ title, description, badge, actions, }) {
    const renderedBadge = typeof badge === 'string' ? (<Badge variant="outline" className="border-teal-200 bg-teal-50 text-teal-800 text-xs font-semibold py-0.5">
      {badge}
    </Badge>) : badge;
    return (<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-200/80">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          {renderedBadge}
        </div>
        {description && (<p className="text-sm text-slate-500 max-w-2xl">{description}</p>)}
      </div>
      {actions && (<div className="flex flex-wrap items-center gap-2.5 sm:self-auto shrink-0">
          {actions}
        </div>)}
    </div>);
}

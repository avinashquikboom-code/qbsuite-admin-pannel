import * as React from 'react'
import { Button } from '@/components/ui/button'
import { RiInboxArchiveLine } from '@remixicon/react'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white/60 p-12 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-teal-50 text-teal-600">
        {icon || <RiInboxArchiveLine className="size-7" />}
      </div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="mt-5 bg-teal-600 hover:bg-teal-700 text-white font-medium"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RiAlertLine, RiCheckboxCircleLine, RiInformationLine } from '@remixicon/react'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'default' | 'destructive' | 'success'
  onConfirm: () => void
  note?: {
    label: string
    placeholder?: string
    value: string
    onChange: (val: string) => void
    required?: boolean
  }
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
  note,
}: ConfirmDialogProps) {
  const getIcon = () => {
    switch (variant) {
      case 'destructive':
        return (
          <div className="flex size-10 items-center justify-center rounded-full bg-rose-100 text-rose-600 shrink-0">
            <RiAlertLine className="size-5" />
          </div>
        )
      case 'success':
        return (
          <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0">
            <RiCheckboxCircleLine className="size-5" />
          </div>
        )
      default:
        return (
          <div className="flex size-10 items-center justify-center rounded-full bg-teal-100 text-teal-600 shrink-0">
            <RiInformationLine className="size-5" />
          </div>
        )
    }
  }

  const getButtonClass = () => {
    switch (variant) {
      case 'destructive':
        return 'bg-rose-600 hover:bg-rose-700 text-white'
      case 'success':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white'
      default:
        return 'bg-teal-600 hover:bg-teal-700 text-white'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border border-slate-200 shadow-xl rounded-xl">
        <div className="flex items-start gap-4">
          {getIcon()}
          <div className="flex-1 space-y-1">
            <DialogHeader className="p-0 text-left">
              <DialogTitle className="text-base font-semibold text-slate-900">
                {title}
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-500 pt-1">
                {description}
              </DialogDescription>
            </DialogHeader>

            {note && (
              <div className="mt-4 space-y-1.5 pt-2">
                <Label className="text-xs font-medium text-slate-700">
                  {note.label} {note.required && <span className="text-rose-500">*</span>}
                </Label>
                <Textarea
                  value={note.value}
                  onChange={(e) => note.onChange(e.target.value)}
                  placeholder={note.placeholder}
                  rows={3}
                  className="resize-none text-sm border-slate-200 focus-visible:ring-teal-500"
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="mt-4 flex flex-row items-center justify-end gap-2 border-t border-slate-100 pt-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-200 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm"
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
            disabled={note?.required && !note.value.trim()}
            className={`${getButtonClass()} text-xs sm:text-sm font-medium`}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

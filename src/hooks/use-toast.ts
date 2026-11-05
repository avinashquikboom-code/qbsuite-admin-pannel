import { toast } from 'sonner'

export { toast }

export function useToast() {
  return {
    toast: (opts: { title: string; description?: string; variant?: 'default' | 'destructive' }) => {
      if (opts.variant === 'destructive') {
        toast.error(opts.title, {
          description: opts.description,
        })
      } else {
        toast.success(opts.title, {
          description: opts.description,
        })
      }
    },
    dismiss: (id?: string | number) => {
      toast.dismiss(id)
    },
  }
}

import { LoaderIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SpinnerCustom({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <LoaderIcon
      role="status"
      aria-label="loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  )
}

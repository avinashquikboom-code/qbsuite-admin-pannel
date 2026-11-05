import { RiLoader4Line } from '@remixicon/react';
import { RemixIcon } from '../icons/RemixIcon';
export function Loading({ label = 'Loading…', className = '' }) { return <div role="status" className={('flex items-center justify-center gap-2 p-6 text-muted-foreground ' + className)}><RemixIcon icon={RiLoader4Line} className="animate-spin text-primary" />{label}</div>; }

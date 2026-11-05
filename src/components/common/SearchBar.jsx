'use client';
import { Input } from './Input';
import { RemixIcon } from '../icons/RemixIcon';
import { RiSearchLine } from '@remixicon/react';
export function SearchBar({ className = '', ...props }) { return <div className={('relative ' + className)}><RemixIcon icon={RiSearchLine} className="absolute top-2 left-3 text-muted-foreground" /><Input type="search" aria-label="Search" placeholder="Search…" {...props} className="pl-10" /></div>; }

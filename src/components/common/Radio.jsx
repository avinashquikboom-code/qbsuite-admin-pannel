'use client';
import { useId } from 'react';
export function Radio({ label, className = '', ...props }) { const id = useId(); return <label className={('inline-flex items-center gap-2 text-sm ' + className)} htmlFor={props.id || id}><input {...props} id={props.id || id} type="radio" className="size-4 accent-primary focus-visible:outline-primary" />{label}</label>; }

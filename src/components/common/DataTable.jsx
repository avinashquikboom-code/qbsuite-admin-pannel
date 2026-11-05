'use client';
import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/common/Table';
import { Pagination } from './Pagination';
import { Loading } from './Loading';
export function DataTable({ columns, data, pageSize = 10, emptyState, isLoading = false, }) {
    const [currentPage, setCurrentPage] = React.useState(1);
    pageSize = Math.max(1, Math.floor(pageSize) || 10);
    const totalPages = Math.ceil(data.length / pageSize) || 1;
    const startIndex = (Math.min(currentPage, totalPages) - 1) * pageSize;
    const currentData = data.slice(startIndex, startIndex + pageSize);
    const page = Math.min(currentPage, totalPages);
    if (isLoading) return <Loading />;
    return (<div className="rounded-xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-slate-50/80 border-b border-slate-200">
            <TableRow className="hover:bg-transparent">
              {columns.map((column, index) => (<TableHead key={index} className={`text-xs font-semibold uppercase tracking-wider text-slate-500 py-3.5 px-4 ${column.headClassName || column.className || ''}`}>
                  {column.header}
                </TableHead>))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length > 0 ? (currentData.map((item) => (<TableRow key={item.id} className="hover:bg-slate-50/60 transition-colors border-b border-slate-100 last:border-none">
                  {columns.map((column, colIndex) => (<TableCell key={colIndex} className={`text-sm text-slate-700 py-3.5 px-4 ${column.className || ''}`}>
                      {column.cell
                    ? column.cell(item)
                    : column.accessorKey
                        ? item[column.accessorKey]
                        : null}
                    </TableCell>))}
                </TableRow>))) : (<TableRow>
                <TableCell colSpan={columns.length} className="h-48 text-center text-slate-400 py-8">
                  {emptyState || 'No records found.'}
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </div>

      {data.length > 0 && (<div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-500">
          <div>
            Showing{' '}
            <span className="font-semibold text-slate-700">
              {startIndex + 1}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-slate-700">
              {Math.min(startIndex + pageSize, data.length)}
            </span>{' '}
            of <span className="font-semibold text-slate-700">{data.length}</span> results
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>)}
    </div>);
}

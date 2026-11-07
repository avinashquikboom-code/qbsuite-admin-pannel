'use client';

export function LoginDashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[420px] perspective-[1200px]">
      <div className="relative rounded-[18px] border border-white/20 bg-linear-to-b from-slate-700 to-slate-900 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <div className="overflow-hidden rounded-[12px] bg-[#F4F7FA]">
          <div className="flex h-[220px] text-[6px] leading-tight text-slate-600">
            <aside className="flex w-[72px] shrink-0 flex-col gap-1 bg-[color:var(--sidebar)] p-1.5 text-white">
              <div className="mb-1 flex items-center gap-1">
                <div className="size-3 rounded bg-brand" />
                <span className="text-[5px] font-bold">QB Suite</span>
              </div>
              {['Dashboard', 'HRM', 'CRM', 'Finance', 'Reports'].map((item) => (
                <div
                  key={item}
                  className="truncate rounded px-1 py-0.5 text-[5px] text-white/90 first:bg-white/15"
                >
                  {item}
                </div>
              ))}
            </aside>
            <div className="min-w-0 flex-1 p-1.5">
              <div className="mb-1 text-[7px] font-bold text-[#101D35]">Welcome, Admin</div>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { label: 'Employees', value: '148' },
                  { label: 'Leads', value: '34' },
                  { label: 'Revenue', value: '₹1.18L' },
                ].map((kpi) => (
                  <div key={kpi.label} className="rounded border border-[#DCE4ED] bg-white p-1">
                    <div className="text-[5px] text-[#64748B]">{kpi.label}</div>
                    <div className="text-[7px] font-bold text-[#101D35]">{kpi.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-2 gap-1">
                <div className="rounded border border-[#DCE4ED] bg-white p-1">
                  <div className="text-[5px] font-semibold text-[#101D35]">Attendance</div>
                  <div className="mt-1 flex h-8 items-end gap-0.5">
                    {[40, 55, 35, 70, 50, 62].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-brand/80"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded border border-[#DCE4ED] bg-white p-1">
                  <div className="text-[5px] font-semibold text-[#101D35]">Sales trend</div>
                  <div className="mt-1 h-8 rounded bg-linear-to-t from-brand-light to-transparent">
                    <svg viewBox="0 0 80 24" className="h-full w-full" preserveAspectRatio="none">
                      <polyline
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="2"
                        points="0,18 12,14 24,16 36,8 48,10 60,6 72,4 80,2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="mx-6 h-2 rounded-b-xl bg-linear-to-b from-slate-600 to-slate-800 shadow-md"
      />
      <div
        aria-hidden
        className="mx-10 h-1.5 rounded-b-lg bg-slate-700/90"
      />
    </div>
  );
}

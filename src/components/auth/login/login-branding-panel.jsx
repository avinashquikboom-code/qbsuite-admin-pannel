'use client';

import { BarChart3, Coins, Layers, Users } from 'lucide-react';
import { LoginDashboardPreview } from './login-dashboard-preview';

const FEATURES = [
  { label: 'HRM & Team Management', icon: Users },
  { label: 'Sales & CRM', icon: BarChart3 },
  { label: 'Operations & Projects', icon: Layers },
  { label: 'Finance & Reports', icon: Coins },
];

export function QbSuiteLogoMark({ size = 'md' }) {
  const box =
    size === 'sm'
      ? 'size-10 rounded-xl'
      : 'size-11 rounded-[14px]';
  const icon = size === 'sm' ? 'size-5' : 'size-5';
  return (
    <div
      className={`flex shrink-0 items-center justify-center ${box} bg-brand text-primary-foreground shadow-[0_8px_24px_rgba(61,136,75,0.35)]`}
    >
      <Layers className={icon} strokeWidth={2.2} aria-hidden />
    </div>
  );
}

export function LoginBrandingPanel() {
  return (
    <section
      className="relative hidden min-h-0 flex-col overflow-hidden text-white lg:flex lg:w-[46%]"
      style={{ backgroundColor: 'var(--sidebar)' }}
      aria-label="QB Suite overview"
    >
      <div className="absolute inset-0 bg-linear-to-br from-[color:var(--sidebar)] via-[color:var(--sidebar-secondary)] to-[#2A5435]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 left-0 h-56 w-[120%] rounded-[100%] bg-brand/20 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-[12%] size-32 rounded-full bg-primary-highlight/20 blur-3xl"
      />

      <svg
        aria-hidden
        className="pointer-events-none absolute top-0 -right-px z-10 h-full w-[72px] text-[#F7FAFC]"
        viewBox="0 0 72 800"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,0 H36 C70,120 48,320 60,520 C68,640 62,720 72,800 H0 Z"
        />
      </svg>

      <svg
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-full text-[color:var(--sidebar-secondary)]"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          fillOpacity="0.55"
          d="M0,160 C240,80 480,200 720,120 C960,40 1200,180 1440,90 L1440,220 L0,220 Z"
        />
        <path
          fill="currentColor"
          fillOpacity="0.35"
          d="M0,190 C300,140 600,210 900,150 C1080,110 1260,170 1440,130 L1440,220 L0,220 Z"
        />
      </svg>

      <div className="relative z-20 flex min-h-0 flex-1 flex-col px-8 pt-8 xl:px-12 xl:pt-10">
        <div className="flex items-center gap-3">
          <QbSuiteLogoMark />
          <div>
            <p className="text-lg font-bold leading-none">QB Suite</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
              Admin Panel
            </p>
          </div>
        </div>

        <div className="mt-10 max-w-md">
          <h1 className="text-3xl font-bold leading-tight tracking-tight xl:text-[2rem]">
            One Platform to
            <br />
            Run{' '}
            <span className="text-primary-highlight">
              Your Business
              <span className="mt-2 block h-0.5 w-[85%] max-w-[220px] rounded-full bg-primary-highlight/70" />
            </span>
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-white/78 xl:text-[15px]">
            Manage HRM, Sales, Operations, Finance and more with a powerful, unified admin panel.
          </p>
        </div>

        <div className="mt-8 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2 xl:mt-10">
          {FEATURES.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-brand/25 ring-1 ring-white/10">
                <Icon className="size-[18px] text-white" strokeWidth={2} aria-hidden />
              </div>
              <span className="text-sm font-medium text-white/95">{label}</span>
            </div>
          ))}
        </div>

        <div className="relative mt-auto hidden pb-8 pt-10 xl:block">
          <LoginDashboardPreview />
        </div>
      </div>
    </section>
  );
}

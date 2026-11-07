'use client';

import { FontAwesomeIcon } from '@/components/icons/FontAwesomeIcon';
import { faChartColumn, faCoins, faLayerGroup, faUsers } from '@fortawesome/free-solid-svg-icons';
import { LoginDashboardPreview } from './login-dashboard-preview';

const FEATURES = [
  { label: 'HRM & Team Management', icon: faUsers },
  { label: 'Sales & CRM', icon: faChartColumn },
  { label: 'Operations & Projects', icon: faLayerGroup },
  { label: 'Finance & Reports', icon: faCoins },
];

export function QbSuiteLogoMark({ size = 'md', onDark = true }) {
  const box =
    size === 'sm'
      ? 'size-10 rounded-xl'
      : 'size-11 rounded-[14px]';
  const icon = size === 'sm' ? 'size-5' : 'size-5';
  return (
    <div
      className={`flex shrink-0 items-center justify-center ${box} bg-[#39E879] text-white shadow-[0_8px_24px_rgba(57,232,121,0.35)]`}
    >
      <FontAwesomeIcon icon={faLayerGroup} className={icon} aria-hidden />
    </div>
  );
}

export function LoginBrandingPanel() {
  return (
    <section
      className="relative hidden min-h-0 flex-col overflow-hidden bg-[#004D36] text-white lg:flex lg:w-[46%]"
      aria-label="QB Suite overview"
    >
      <div className="absolute inset-0 bg-linear-to-br from-[#004D36] via-[#006B45] to-[#005338]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 left-0 h-56 w-[120%] rounded-[100%] bg-[#00B94F]/20 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-[12%] size-32 rounded-full bg-[#39E879]/20 blur-3xl"
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
        className="pointer-events-none absolute bottom-0 left-0 w-full text-[#006B45]"
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
            <span className="text-[#39E879]">
              Your Business
              <span className="mt-2 block h-0.5 w-[85%] max-w-[220px] rounded-full bg-[#39E879]/70" />
            </span>
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-white/78 xl:text-[15px]">
            Manage HRM, Sales, Operations, Finance and more with a powerful, unified admin panel.
          </p>
        </div>

        <div className="mt-8 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2 xl:mt-10">
          {FEATURES.map(({ label, icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#00B94F]/25 ring-1 ring-white/10">
                <FontAwesomeIcon icon={icon} className="size-4 text-white" aria-hidden />
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

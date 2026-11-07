'use client';

import * as React from 'react';
import { LoginBrandingPanel, QbSuiteLogoMark } from './login-branding-panel';
import { LoginFormCard } from './login-form-card';

function MobileBrandMark() {
  return (
    <div className="flex items-center gap-2">
      <QbSuiteLogoMark size="sm" />
      <div>
        <p className="text-base font-bold text-[#101D35]">QB Suite</p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">
          Admin Panel
        </p>
      </div>
    </div>
  );
}

export function AdminLoginScreen() {
  return (
    <div className="flex h-dvh max-h-dvh w-full overflow-hidden bg-[#F7FAFC]">
      <LoginBrandingPanel />

      <section className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#F7FAFC] lg:w-[54%]">
        <svg
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-48 w-72 text-brand-light"
          viewBox="0 0 300 200"
        >
          <path
            fill="currentColor"
            d="M300,0 C220,40 180,120 140,200 L300,200 Z"
          />
          <path
            fill="currentColor"
            fillOpacity="0.65"
            d="M300,30 C250,80 210,140 170,200 L300,200 Z"
          />
        </svg>
        <svg
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 h-44 w-64 text-primary-muted"
          viewBox="0 0 280 180"
        >
          <path
            fill="currentColor"
            d="M280,180 C200,140 160,60 80,20 L280,0 Z"
          />
        </svg>

        <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-6 sm:px-6 lg:px-10">
          <div className="mb-6 flex items-center gap-2 lg:hidden">
            <MobileBrandMark />
          </div>
          <React.Suspense
            fallback={
              <div className="h-[520px] w-full max-w-[670px] animate-pulse rounded-[28px] bg-white/80 shadow-lg" />
            }
          >
            <LoginFormCard />
          </React.Suspense>
        </div>
      </section>
    </div>
  );
}

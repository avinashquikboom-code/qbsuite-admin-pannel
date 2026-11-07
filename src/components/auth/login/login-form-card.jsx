'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@/components/icons/FontAwesomeIcon';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faRightToBracket,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { loginAdmin, validateLoginForm } from '@/lib/auth/admin-login';
import { QbSuiteLogoMark } from './login-branding-panel';

export function LoginFormCard({ className }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [apiError, setApiError] = React.useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    setApiError('');
    const errors = validateLoginForm({ email, password });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      const result = await loginAdmin({ email, password, remember });
      toast.success('Signed in successfully');
      const next = searchParams.get('next');
      router.push(result?.redirectTo || next || '/admin/dashboard');
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign in failed.';
      setApiError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'w-full max-w-[670px] rounded-[28px] border border-[#E9F2F8] bg-white px-6 py-8 shadow-[0_24px_80px_rgba(16,29,53,0.08)] sm:px-10 sm:py-10',
        className,
      )}
    >
      <div className="flex flex-col items-center text-center">
        <QbSuiteLogoMark size="sm" onDark={false} />
        <p className="mt-4 text-lg font-bold text-[#101D35]">QB Suite</p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#64748B]">
          Admin Panel
        </p>
        <h2 className="mt-6 text-2xl font-bold text-[#101D35] sm:text-[1.65rem]">
          Welcome Back 👋
        </h2>
        <p className="mt-2 text-sm text-[#64748B]">Sign in to access your admin dashboard</p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
        {apiError ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">
            {apiError}
          </p>
        ) : null}

        <div className="space-y-2">
          <label htmlFor="admin-login-email" className="text-sm font-medium text-[#101D35]">
            Email Address
          </label>
          <div className="relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#64748B]"
              aria-hidden
            />
            <input
              id="admin-login-email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) {
                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
              className={cn(
                'h-12 w-full rounded-xl border bg-white pr-3 pl-11 text-sm text-[#101D35] outline-none transition-colors placeholder:text-[#94A3B8]',
                fieldErrors.email ? 'border-rose-400 ring-2 ring-rose-100' : 'border-[#DCE4ED] focus:border-brand focus:ring-2 focus:ring-brand-light',
              )}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? 'admin-login-email-error' : undefined}
              required
            />
          </div>
          {fieldErrors.email ? (
            <p id="admin-login-email-error" className="text-xs text-rose-600">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="admin-login-password" className="text-sm font-medium text-[#101D35]">
            Password
          </label>
          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#64748B]"
              aria-hidden
            />
            <input
              id="admin-login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
              className={cn(
                'h-12 w-full rounded-xl border bg-white pr-12 pl-11 text-sm text-[#101D35] outline-none transition-colors placeholder:text-[#94A3B8]',
                fieldErrors.password ? 'border-rose-400 ring-2 ring-rose-100' : 'border-[#DCE4ED] focus:border-brand focus:ring-2 focus:ring-brand-light',
              )}
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? 'admin-login-password-error' : undefined}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-2.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#101D35]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} className="size-4" />
              ) : (
                <FontAwesomeIcon icon={faEye} className="size-4" />
              )}
            </button>
          </div>
          {fieldErrors.password ? (
            <p id="admin-login-password-error" className="text-xs text-rose-600">
              {fieldErrors.password}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#475569]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="size-4 rounded border-[#DCE4ED] text-brand focus:ring-brand/30"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-brand hover:text-brand-dark"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-dark text-sm font-bold text-primary-foreground shadow-[0_12px_28px_rgba(94,193,105,0.35)] transition hover:from-primary-hover hover:to-brand active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="size-4 animate-spin" aria-hidden />
              Signing In…
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faRightToBracket} className="size-4" aria-hidden />
              Sign In
            </>
          )}
        </button>
      </form>
    </div>
  );
}

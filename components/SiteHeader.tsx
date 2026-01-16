"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

const locales: Locale[] = ["sq", "en", "it"];

type Props = {
  locale: Locale;
  labels: {
    buy: string;
    rent: string;
    sell: string;
    search: string;
    create: string;
    dashboard: string;
    admin: string;
    about: string;
    how: string;
    agents: string;
    guides: string;
  };
};

export default function SiteHeader({ locale, labels }: Props) {
  const pathname = usePathname();
  const switchLocalePath = (target: Locale) => {
    if (!pathname) return `/${target}`;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${target}`;
    if (locales.includes(segments[0] as Locale)) {
      segments[0] = target;
      return `/${segments.join("/")}`;
    }
    return `/${target}${pathname}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/${locale}`} className="text-xl font-semibold text-slate-900">
            AlbaniaEstate
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex">
            <Link href={`/${locale}/search`} className="hover:text-slate-900">
              {labels.search}
            </Link>
            <Link href={`/${locale}/about`} className="hover:text-slate-900">
              {labels.about}
            </Link>
            <Link href={`/${locale}/how-it-works`} className="hover:text-slate-900">
              {labels.how}
            </Link>
            <Link href={`/${locale}/agents`} className="hover:text-slate-900">
              {labels.agents}
            </Link>
            <Link href={`/${locale}/guides`} className="hover:text-slate-900">
              {labels.guides}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/create-listing`}
            className="hidden rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 lg:inline-flex"
          >
            {labels.create}
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600">
            <Globe className="h-4 w-4" />
            <select
              className="bg-transparent text-sm focus:outline-none"
              value={locale}
              onChange={(event) => {
                window.location.href = switchLocalePath(event.target.value as Locale);
              }}
              aria-label="Switch language"
            >
              {locales.map((loc) => (
                <option key={loc} value={loc}>
                  {loc.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className={cn(
              "flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 lg:hidden"
            )}
          >
            <Menu className="h-4 w-4" />
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}

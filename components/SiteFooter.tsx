import Link from "next/link";
import type { Locale } from "@/lib/i18n";

const links = [
  { slug: "about", label: { sq: "Rreth nesh", en: "About", it: "Chi siamo" } },
  { slug: "how-it-works", label: { sq: "Si funksionon", en: "How it works", it: "Come funziona" } },
  { slug: "agents", label: { sq: "Agjentët", en: "Agents", it: "Agenti" } },
  { slug: "guides", label: { sq: "Guidat", en: "Guides", it: "Guide" } }
];

export default function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-shell grid gap-8 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">AlbaniaEstate</h3>
          <p className="mt-3 text-sm text-slate-600">
            Marketplace i pasurive të paluajtshme për Shqipërinë me agjentë të verifikuar dhe kërkim inteligjent.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {links.map((link) => (
              <li key={link.slug}>
                <Link href={`/${locale}/${link.slug}`} className="hover:text-slate-900">
                  {link.label[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Contact</h4>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <p>support@albaniaestate.al</p>
            <p>+355 69 999 1111</p>
            <p>Tirana, Albania</p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © 2025 AlbaniaEstate. All rights reserved.
      </div>
    </footer>
  );
}

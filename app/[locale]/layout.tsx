import type { Metadata } from "next";
import { getCopy, locales } from "@/lib/i18n";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = locales.includes(params.locale as any) ? params.locale : "sq";
  const copy = getCopy(locale as any);
  return {
    title: {
      default: "AlbaniaEstate",
      template: `%s · AlbaniaEstate`
    },
    description: copy.home.subheadline,
    alternates: {
      languages: {
        sq: "/sq",
        en: "/en",
        it: "/it"
      }
    }
  };
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = locales.includes(params.locale as any) ? (params.locale as any) : "sq";
  const copy = getCopy(locale);

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader locale={locale} labels={copy.nav} />
      <main className="min-h-screen">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
